import { useContext } from 'react'

import CartStateContext from '../context/cartContext'

function useCart() {
  const cart = useContext(CartStateContext)

  if (!cart) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return cart
}

export default useCart
