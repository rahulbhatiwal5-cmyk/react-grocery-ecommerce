import { useCallback, useEffect, useMemo, useState } from 'react'

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
      .map((item) => products.find(
        (product) => product.id === Number(item?.id ?? item),
      ))
      .filter(Boolean)
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(readStoredWishlist)

  useEffect(() => {
    window.localStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(wishlistItems),
    )
  }, [wishlistItems])

  const toggleWishlist = useCallback((product) => {
    if (!product?.id) {
      return
    }

    setWishlistItems((currentItems) => {
      const isSaved = currentItems.some((item) => item.id === product.id)

      return isSaved
        ? currentItems.filter((item) => item.id !== product.id)
        : [...currentItems, product]
    })
  }, [])

  const isWishlisted = useCallback((productId) => (
    wishlistItems.some((item) => item.id === productId)
  ), [wishlistItems])

  const value = useMemo(() => ({
    wishlistItems,
    wishlistCount: wishlistItems.length,
    toggleWishlist,
    isWishlisted,
  }), [isWishlisted, toggleWishlist, wishlistItems])

  return (
    <WishlistStateContext.Provider value={value}>
      {children}
    </WishlistStateContext.Provider>
  )
}
