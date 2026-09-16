import { useCallback, useEffect, useMemo, useState } from 'react'

import CartStateContext from './cartContext'
import products from '../data/products'

const CART_STORAGE_KEY = 'greenbasket_cart'
const STANDARD_DELIVERY_CHARGE = 20

function readStoredCart() {
  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY)
    const parsedCart = storedCart ? JSON.parse(storedCart) : []

    if (!Array.isArray(parsedCart)) {
      return []
    }

    return parsedCart
      .map((item) => {
        const product = products.find(
          (currentProduct) => currentProduct.id === Number(item?.id),
        )

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

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(readStoredCart)

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product?.id) {
      return
    }

    const amount = Math.max(1, Math.floor(Number(quantity) || 1))

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        return currentItems.map((item) => (
          item.id === product.id
            ? { ...item, quantity: item.quantity + amount }
            : item
        ))
      }

      return [...currentItems, { ...product, quantity: amount }]
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCartItems((currentItems) => (
      currentItems.filter((item) => item.id !== productId)
    ))
  }, [])

  const increaseQuantity = useCallback((productId) => {
    setCartItems((currentItems) => (
      currentItems.map((item) => (
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    ))
  }, [])

  const decreaseQuantity = useCallback((productId) => {
    setCartItems((currentItems) => (
      currentItems
        .map((item) => (
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ))
        .filter((item) => item.quantity > 0)
    ))
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const cartCount = useMemo(() => (
    cartItems.reduce((count, item) => count + item.quantity, 0)
  ), [cartItems])

  const subtotal = useMemo(() => (
    cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  ), [cartItems])

  const deliveryCharge = cartItems.length > 0
    ? STANDARD_DELIVERY_CHARGE
    : 0

  const grandTotal = subtotal + deliveryCharge

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartCount,
    subtotal,
    deliveryCharge,
    grandTotal,
  }), [
    addToCart,
    cartCount,
    cartItems,
    clearCart,
    decreaseQuantity,
    deliveryCharge,
    grandTotal,
    increaseQuantity,
    removeFromCart,
    subtotal,
  ])

  return (
    <CartStateContext.Provider value={value}>
      {children}
    </CartStateContext.Provider>
  )
}
