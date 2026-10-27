import api from './api'

const data = (response) => response.data.data
const session = (expectedUserId) => ({ expectedUserId })

export const placeOrder = async (addressId, idempotencyKey, owner) => data(await api.post(
  '/orders',
  { address_id: addressId, payment_method: 'cod' },
  { ...session(owner), headers: { 'Idempotency-Key': idempotencyKey } },
))

export const fetchOrders = async (owner) => data(await api.get('/orders', session(owner)))
export const fetchOrder = async (orderId, owner) => data(await api.get(`/orders/${orderId}`, session(owner)))
