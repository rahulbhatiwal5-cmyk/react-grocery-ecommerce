import api from './api'

export const getProducts = async (params = {}, signal) => (await api.get('/products', { params, signal })).data.data
export const getProduct = async (id, signal) => (await api.get(`/products/${encodeURIComponent(id)}`, { signal })).data.data
