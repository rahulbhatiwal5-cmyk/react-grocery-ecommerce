import { useContext } from 'react'

import WishlistStateContext from '../context/wishlistContext'

function useWishlist() {
  const wishlist = useContext(WishlistStateContext)

  if (!wishlist) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }

  return wishlist
}

export default useWishlist
