import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { fetchWishlist, addWishlistItem, removeWishlistItem, clearServerWishlist, mergeGuestWishlist } from '../services/wishlistService'

import WishlistStateContext from './wishlistContext'
import products from '../data/products'

const WISHLIST_STORAGE_KEY = 'greenbasket_wish'

function readStoredWishlist() {
  try {
    const storedWishlist = window.localStorage.getItem(WISHLIST_STORAGE_KEY)
    const parsedWishlist = storedWishlist ? JSON.parse(storedWishlist) : []

    if (!Array.isArray(parsedWishlist)) {
      return []
    }

    return parsedWishlist
      .map((item) => (
        item && typeof item === 'object' && item.name && Number.isFinite(Number(item.price))
          ? item
          : products.find((product) => product.id === Number(item?.id ?? item))
      ))
      .filter(Boolean)
  } catch {
    return []
  }
}

function normalizeWishlist(wishlist) {
  return wishlist.items.map(({ product }) => product)
}

export function WishlistProvider({ children }) {
  const { user, token, loading: authLoading, isAuthenticated } = useAuth()
  const userId = isAuthenticated ? user.id : null
  const [guestItems, setGuestItems] = useState(readStoredWishlist)
  const [serverState, setServerState] = useState({ owner: null, items: [], status: 'idle', error: '' })
  const [guestError, setGuestError] = useState('')
  const [reload, setReload] = useState(0)
  const [pendingIds, setPendingIds] = useState([])
  const pendingRef = useRef(new Set())
  const session = useRef(null)
  const currentItems = useRef(null)
  const queue = useRef(Promise.resolve())
  const mergeInFlight = useRef(null)

  useLayoutEffect(() => {
    session.current = userId
    currentItems.current = null
    pendingRef.current = new Set()
    queue.current = Promise.resolve()
    // Clear the previous account before its items can be displayed.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setServerState({ owner: null, items: [], status: 'idle', error: '' })
    setPendingIds([])
  }, [userId])

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(guestItems))
  }, [guestItems])

  useEffect(() => {
    const syncGuestWishlist = (event) => {
      if (event.key === WISHLIST_STORAGE_KEY || event.key === null) setGuestItems(readStoredWishlist())
    }
    window.addEventListener('storage', syncGuestWishlist)
    return () => window.removeEventListener('storage', syncGuestWishlist)
  }, [])

  useEffect(() => {
    if (!userId) return undefined
    let active = true
    async function load() {
      try {
        const ids = [...new Set(readStoredWishlist().map((item) => Number(item.id)))].sort((a, b) => a - b)
        let result
        if (ids.length) {
          const key = JSON.stringify([userId, ids])
          if (mergeInFlight.current?.key !== key) {
            const promise = mergeGuestWishlist(ids.map((id) => ({ product_id: id })), userId)
            mergeInFlight.current = { key, promise }
            promise.finally(() => { if (mergeInFlight.current?.promise === promise) mergeInFlight.current = null }).catch(() => {})
          }
          result = await mergeInFlight.current.promise
          if (!active || session.current !== userId) return
          const merged = new Set(ids)
          const remaining = readStoredWishlist().filter((item) => !merged.has(Number(item.id)))
          localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(remaining))
          setGuestItems(remaining)
          setGuestError('')
        } else {
          result = await fetchWishlist(userId)
        }
        if (!active || session.current !== userId) return
        const items = normalizeWishlist(result)
        currentItems.current = items
        setServerState({ owner: userId, items, status: 'ready', error: '' })
      } catch (error) {
        if (!active || session.current !== userId) return
        const unavailable = error.response?.status === 422 && error.response?.data?.errors?.product_id
        setServerState({ owner: userId, items: [], status: 'error', error: unavailable ? 'A saved guest item is unavailable. Sign out to update your guest wishlist, then sign in again.' : error.response?.data?.message || error.message || 'Unable to load wishlist.' })
      }
    }
    load()
    return () => { active = false }
  }, [userId, reload])

  const loggedIn = Boolean(userId)
  const waitingForAuth = !loggedIn && (authLoading || Boolean(token))
  const serverReady = loggedIn && serverState.owner === userId && serverState.status === 'ready'
  const wishlistItems = useMemo(() => loggedIn ? (serverReady ? serverState.items : []) : waitingForAuth ? [] : guestItems, [loggedIn, serverReady, serverState.items, waitingForAuth, guestItems])
  const wishlistLoading = waitingForAuth || (loggedIn && serverState.owner !== userId)
  const wishlistError = loggedIn && serverState.owner === userId ? serverState.error : guestError
  const retryWishlist = useCallback(() => {
    if (!userId) { setGuestError(''); return }
    setServerState({ owner: null, items: [], status: 'idle', error: '' })
    setReload((value) => value + 1)
  }, [userId])

  const toggleWishlist = useCallback((product) => {
    if (!product?.id) return
    if (!loggedIn) {
      if (waitingForAuth) { setGuestError('Please wait for your session to load.'); return }
      setGuestError('')
      setGuestItems((items) => items.some((item) => item.id === product.id) ? items.filter((item) => item.id !== product.id) : [...items, product])
      return
    }
    const owner = userId
    if (!serverReady) {
      setServerState((state) => ({ ...state, owner, status: 'error', error: state.error || 'Wishlist is not ready. Please retry from your wishlist.' }))
      return
    }
    if (pendingRef.current.has(product.id)) return
    pendingRef.current.add(product.id)
    setPendingIds([...pendingRef.current])
    queue.current = queue.current.catch(() => {}).then(async () => {
      if (session.current !== owner) return
      try {
        if (!currentItems.current) return
        const saved = currentItems.current.some((item) => item.id === product.id)
        const response = saved ? await removeWishlistItem(product.id, owner) : await addWishlistItem(product.id, owner)
        if (session.current !== owner) return
        const items = normalizeWishlist(response)
        currentItems.current = items
        setServerState({ owner, items, status: 'ready', error: '' })
      } catch (error) {
        if (session.current !== owner) return
        try {
          const items = normalizeWishlist(await fetchWishlist(owner))
          if (session.current === owner) {
            currentItems.current = items
            setServerState({ owner, items, status: 'ready', error: error.response?.data?.message || 'Wishlist update failed. Check your wishlist before retrying.' })
          }
        } catch {
          if (session.current === owner) {
            currentItems.current = null
            setServerState((state) => ({ ...state, status: 'error', error: 'Unable to confirm the wishlist update. Reload your wishlist before retrying.' }))
          }
        }
      } finally {
        if (session.current === owner) {
          pendingRef.current.delete(product.id)
          setPendingIds([...pendingRef.current])
        }
      }
    })
  }, [loggedIn, waitingForAuth, userId, serverReady])

  const clearWishlist = useCallback(async () => {
    if (!loggedIn) { if (!waitingForAuth) setGuestItems([]); return }
    if (!serverReady) return
    const owner = userId
    queue.current = queue.current.catch(() => {}).then(async () => {
      if (session.current !== owner || !currentItems.current) return
      try {
        const items = normalizeWishlist(await clearServerWishlist(owner))
        if (session.current !== owner) return
        currentItems.current = items
        setServerState({ owner, items, status: 'ready', error: '' })
      } catch {
        if (session.current === owner) {
          currentItems.current = null
          setServerState((state) => ({ ...state, status: 'error', error: 'Unable to confirm the wishlist update. Reload your wishlist before retrying.' }))
        }
      }
    })
    return queue.current
  }, [loggedIn, waitingForAuth, serverReady, userId])
  const isWishlisted = useCallback((productId) => wishlistItems.some((item) => item.id === productId), [wishlistItems])
  const isWishlistPending = useCallback((productId) => pendingIds.includes(productId), [pendingIds])
  const value = useMemo(() => ({ wishlistItems, wishlistCount: wishlistItems.length, toggleWishlist, clearWishlist, isWishlisted, isWishlistPending, wishlistLoading, wishlistError, retryWishlist }), [wishlistItems, toggleWishlist, clearWishlist, isWishlisted, isWishlistPending, wishlistLoading, wishlistError, retryWishlist])

  return <WishlistStateContext.Provider value={value}>{children}</WishlistStateContext.Provider>
}
