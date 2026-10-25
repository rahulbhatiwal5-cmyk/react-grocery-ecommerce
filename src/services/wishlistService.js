import api from './api'

const data = (response) => response.data.data
const session = (expectedUserId) => ({ expectedUserId })
export const fetchWishlist = async (owner) => data(await api.get('/wishlist', session(owner)))
export const addWishlistItem = async (productId, owner) => data(await api.post('/wishlist/items', { product_id: productId }, session(owner)))
export const removeWishlistItem = async (productId, owner) => data(await api.delete(`/wishlist/items/${productId}`, session(owner)))
export const clearServerWishlist = async (owner) => data(await api.delete('/wishlist', session(owner)))
export const mergeGuestWishlist = async (items, owner) => data(await api.post('/wishlist/merge', { items }, session(owner)))
