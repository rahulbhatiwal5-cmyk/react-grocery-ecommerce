import api from './api'

const data = (response) => response.data.data
const session = (expectedUserId) => ({ expectedUserId })
export const fetchCart = async (owner) => data(await api.get('/cart', session(owner)))
export const addCartItem = async (productId, quantity, owner) => data(await api.post('/cart/items', { product_id: productId, quantity }, session(owner)))
export const updateCartItem = async (productId, quantity, owner) => data(await api.patch(`/cart/items/${productId}`, { quantity }, session(owner)))
export const removeCartItem = async (productId, owner) => data(await api.delete(`/cart/items/${productId}`, session(owner)))
export const clearServerCart = async (owner) => data(await api.delete('/cart', session(owner)))
export const mergeGuestCart = async (items, key, owner) => data(await api.post('/cart/merge', { items }, { ...session(owner), headers: { 'Idempotency-Key': key } }))
