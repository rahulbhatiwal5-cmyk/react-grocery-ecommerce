import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import useAuth from '../hooks/useAuth'
import { fetchCart, addCartItem, updateCartItem, removeCartItem, clearServerCart, mergeGuestCart } from '../services/cartService'

import CartStateContext from './cartContext'
import products from '../data/products'

const CART_STORAGE_KEY = 'greenbasket_cart'
const STANDARD_DELIVERY_CHARGE = 20
const MERGE_STORAGE_KEY = 'greenbasket_cart_merge'

function readStoredCart() {
  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY)
    const parsedCart = storedCart ? JSON.parse(storedCart) : []

    if (!Array.isArray(parsedCart)) {
      return []
    }

    return parsedCart
      .map((item) => {
        const product = item && typeof item === 'object' && item.name && Number.isFinite(Number(item.price))
          ? item
          : products.find((currentProduct) => currentProduct.id === Number(item?.id))

        if (!product) {
          return null
        }

        return {
          ...product,
          quantity: Math.max(
            1,
            Math.floor(Number(item.quantity ?? item.qty) || 1),
          ),
        }
      })
      .filter(Boolean)
  } catch {
    return []
  }
}

function readPendingMerge() {
  try { return JSON.parse(localStorage.getItem(MERGE_STORAGE_KEY) || 'null') } catch { return null }
}

function normalizeCart(cart) {
  return { ...cart, items: cart.items.map(({ product, quantity }) => ({ ...product, quantity })) }
}

export function CartProvider({ children }) {
  const { user, token, loading: authLoading, isAuthenticated } = useAuth()
  const userId = isAuthenticated ? user.id : null
  const [guestItems, setGuestItems] = useState(readStoredCart)
  const [serverState, setServerState] = useState({ owner: null, cart: null, status: 'idle', error: '' })
  const [guestError, setGuestError] = useState('')
  const [reload, setReload] = useState(0)
  const session = useRef(null)
  const currentCart = useRef(null)
  const queue = useRef(Promise.resolve())

  useLayoutEffect(() => {
    session.current = userId
    currentCart.current = null
    queue.current = Promise.resolve()
    // Reset the previous session before its cart can be shown again.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setServerState({ owner: null, cart: null, status: 'idle', error: '' })
  }, [userId])

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(guestItems))
  }, [guestItems])

  useEffect(() => {
    const syncGuestCart = (event) => {
      if (event.key === CART_STORAGE_KEY || event.key === null) setGuestItems(readStoredCart())
    }
    window.addEventListener('storage', syncGuestCart)
    return () => window.removeEventListener('storage', syncGuestCart)
  }, [])

  useEffect(() => {
    if (!userId) return undefined
    let active = true
    async function load() {
      try {
        let pending = readPendingMerge()
        if (pending && pending.userId !== userId) throw new Error('A guest cart is awaiting confirmation for another account. Sign in to that account to recover it.')
        if (!pending) {
          const items = readStoredCart().map((item) => ({ product_id: Number(item.id), quantity: item.quantity }))
          if (items.length) {
            pending = { userId, items, key: crypto.randomUUID() }
            localStorage.setItem(MERGE_STORAGE_KEY, JSON.stringify(pending))
          }
        }
        let cart
        if (pending) {
          cart = await mergeGuestCart(pending.items, pending.key, userId)
          if (!active || session.current !== userId) return
          localStorage.removeItem(CART_STORAGE_KEY)
          localStorage.removeItem(MERGE_STORAGE_KEY)
          setGuestItems([])
          setGuestError('')
        } else {
          cart = await fetchCart(userId)
        }
        if (!active || session.current !== userId) return
        const normalized = normalizeCart(cart)
        currentCart.current = normalized
        setServerState({ owner: userId, cart: normalized, status: 'ready', error: '' })
      } catch (error) {
        if (active && session.current === userId) {
          const unavailable = error.response?.status === 422 && error.response?.data?.errors?.product_id
          if (unavailable) localStorage.removeItem(MERGE_STORAGE_KEY)
          setServerState({ owner: userId, cart: null, status: 'error', error: unavailable ? 'A guest cart item is unavailable. Sign out to update your guest cart, then sign in again.' : error.response?.data?.message || error.message || 'Unable to load cart.' })
        }
      }
    }
    load()
    return () => { active = false }
  }, [userId, reload])

  const loggedIn = Boolean(userId)
  const waitingForAuth = !loggedIn && (authLoading || Boolean(token))
  const serverReady = loggedIn && serverState.owner === userId && serverState.status === 'ready'
  const cartItems = useMemo(() => loggedIn ? (serverReady ? serverState.cart.items : []) : waitingForAuth ? [] : guestItems, [loggedIn, serverReady, serverState.cart, waitingForAuth, guestItems])
  const cartLoading = waitingForAuth || (loggedIn && serverState.owner !== userId)
  const cartError = loggedIn && serverState.owner === userId ? serverState.error : guestError
  const retryCart = useCallback(() => { if (!userId) { setGuestError(''); return }; setServerState({ owner: null, cart: null, status: 'idle', error: '' }); setReload((value) => value + 1) }, [userId])

  const runServer = useCallback((operation) => {
    const owner = userId
    if (!serverReady) {
      setServerState((state) => ({ ...state, owner, status: 'error', error: state.error || 'Cart is not ready. Please retry from your cart.' }))
      return Promise.resolve(false)
    }
    queue.current = queue.current.catch(() => {}).then(async () => {
      if (session.current !== owner) return false
      try {
        const cart = normalizeCart(await operation(currentCart.current))
        if (session.current !== owner) return
        currentCart.current = cart
        setServerState({ owner, cart, status: 'ready', error: '' })
        return true
      } catch (error) {
        if (session.current !== owner) return false
        try {
          const cart = normalizeCart(await fetchCart(owner))
          if (session.current === owner) {
            currentCart.current = cart
            setServerState({ owner, cart, status: 'ready', error: error.response?.data?.message || 'Cart update failed. Check your cart before trying again.' })
          }
        } catch {
          if (session.current === owner) setServerState((state) => ({ ...state, status: 'error', error: 'Unable to confirm the cart update. Reload your cart before trying again.' }))
        }
        return false
      }
    })
    return queue.current
  }, [userId, serverReady])

  const guestChange = useCallback((update) => {
    if (waitingForAuth || readPendingMerge()) {
      setGuestError('A guest cart is awaiting confirmation. Sign in to the same account and retry before changing it.')
      return false
    }
    setGuestError('')
    setGuestItems(update)
    return true
  }, [waitingForAuth])

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product?.id) return
    const amount = Math.max(1, Math.floor(Number(quantity) || 1))
    if (loggedIn) return runServer(() => addCartItem(product.id, amount, userId))
    return guestChange((items) => {
      const existing = items.find((item) => item.id === product.id)
      return existing ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + amount } : item) : [...items, { ...product, quantity: amount }]
    })
  }, [loggedIn, runServer, guestChange, userId])

  const removeFromCart = useCallback((productId) => {
    if (loggedIn) return runServer(() => removeCartItem(productId, userId))
    guestChange((items) => items.filter((item) => item.id !== productId))
  }, [loggedIn, runServer, guestChange, userId])

  const changeQuantity = useCallback((productId, delta) => {
    if (loggedIn) return runServer((cart) => {
      const item = cart.items.find((entry) => entry.id === productId)
      if (!item) throw new Error('This item is no longer in the cart.')
      return item.quantity + delta < 1 ? removeCartItem(productId, userId) : updateCartItem(productId, item.quantity + delta, userId)
    })
    guestChange((items) => items.map((item) => item.id === productId ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0))
  }, [loggedIn, runServer, guestChange, userId])
  const increaseQuantity = useCallback((id) => changeQuantity(id, 1), [changeQuantity])
  const decreaseQuantity = useCallback((id) => changeQuantity(id, -1), [changeQuantity])
  const clearCart = useCallback(() => {
    if (loggedIn) return runServer(() => clearServerCart(userId))
    return guestChange(() => [])
  }, [loggedIn, runServer, guestChange, userId])

  const localCount = cartItems.reduce((count, item) => count + item.quantity, 0)
  const localSubtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = serverReady ? serverState.cart.cart_count : localCount
  const subtotal = serverReady ? serverState.cart.subtotal : localSubtotal
  const deliveryCharge = serverReady ? serverState.cart.delivery_charge : (cartItems.length ? STANDARD_DELIVERY_CHARGE : 0)
  const grandTotal = serverReady ? serverState.cart.grand_total : subtotal + deliveryCharge
  const value = useMemo(() => ({ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, cartCount, subtotal, deliveryCharge, grandTotal, cartLoading, cartError, retryCart }), [cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, cartCount, subtotal, deliveryCharge, grandTotal, cartLoading, cartError, retryCart])

  return <CartStateContext.Provider value={value}>{children}</CartStateContext.Provider>
}
