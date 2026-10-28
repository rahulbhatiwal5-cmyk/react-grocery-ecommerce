import api from './api'

const data = (response) => response.data.data
const session = (expectedUserId) => ({ expectedUserId })
const timeout = 20000

export const createRazorpayOrder = async (addressId, idempotencyKey, owner) => data(await api.post(
  '/payments/razorpay/create-order',
  { address_id: addressId },
  { ...session(owner), timeout, headers: { 'Idempotency-Key': idempotencyKey } },
))

export const verifyRazorpayPayment = async (payment, owner) => data(await api.post(
  '/payments/razorpay/verify',
  payment,
  { ...session(owner), timeout },
))

export const markRazorpayPaymentFailed = async (attempt, failure, owner) => data(await api.post(
  '/payments/razorpay/fail',
  {
    order_id: attempt.order_id,
    razorpay_order_id: attempt.razorpay_order_id,
    error_code: failure?.code || 'checkout_dismissed',
    error_description: failure?.description || 'The Razorpay checkout was closed before payment was confirmed.',
  },
  { ...session(owner), timeout },
))
