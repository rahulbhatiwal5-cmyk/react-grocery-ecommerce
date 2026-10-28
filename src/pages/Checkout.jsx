import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import useCart from '../hooks/useCart'
import { createAddress, fetchAddresses } from '../services/addressService'
import { placeOrder } from '../services/orderService'
import { createRazorpayOrder, markRazorpayPaymentFailed, verifyRazorpayPayment } from '../services/paymentService'

const initialAddressValues = {
  full_name: '',
  phone: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  state: '',
  postal_code: '',
  country: 'India',
  is_default: false,
}

function formatCurrency(amount) {
  return `₹${Number(amount || 0).toLocaleString('en-IN')}`
}

function getErrorMessage(error, fallback) {
  const validationMessages = Object.values(error.response?.data?.errors || {}).flat()

  return validationMessages.find((message) => typeof message === 'string')
    || error.response?.data?.message
    || error.message
    || fallback
}

function addressText(address) {
  return [
    address.address_line_1,
    address.address_line_2,
    address.city,
    address.state,
    address.postal_code,
    address.country,
  ].filter(Boolean).join(', ')
}

function loadRazorpayScript() {
  if (window.Razorpay) return Promise.resolve()

  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error('Razorpay checkout took too long to load. Please try again.')), 20000)
    const finish = (callback, value) => {
      window.clearTimeout(timeout)
      callback(value)
    }
    const existingScript = document.querySelector('script[data-greenbasket-razorpay]')
    if (existingScript) {
      existingScript.addEventListener('load', () => finish(resolve), { once: true })
      existingScript.addEventListener('error', () => finish(reject, new Error('Razorpay checkout could not be loaded.')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.dataset.greenbasketRazorpay = 'true'
    script.onload = () => finish(resolve)
    script.onerror = () => finish(reject, new Error('Razorpay checkout could not be loaded. Check your internet connection and try again.'))
    document.body.appendChild(script)
  })
}

function openRazorpayCheckout(attempt) {
  return new Promise((resolve, reject) => {
    const checkout = new window.Razorpay({
      key: attempt.key_id,
      amount: attempt.amount,
      currency: attempt.currency,
      name: 'GreenBasket',
      description: `Order #${attempt.order_id}`,
      order_id: attempt.razorpay_order_id,
      prefill: attempt.prefill,
      theme: { color: '#198754' },
      handler: resolve,
      modal: {
        ondismiss: () => reject({ code: 'checkout_dismissed', description: 'Payment was cancelled. Your cart is still available.' }),
      },
    })

    checkout.on('payment.failed', (response) => reject({
      code: response.error?.code || 'payment_failed',
      description: response.error?.description || 'Razorpay could not complete the payment.',
    }))
    checkout.open()
  })
}

function Checkout() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const {
    cartCount,
    cartError,
    cartItems,
    cartLoading,
    deliveryCharge,
    grandTotal,
    refreshCart,
    retryCart,
    subtotal,
  } = useCart()
  const [addresses, setAddresses] = useState([])
  const [addressesLoading, setAddressesLoading] = useState(true)
  const [addressError, setAddressError] = useState('')
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [addressValues, setAddressValues] = useState(initialAddressValues)
  const [savingAddress, setSavingAddress] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [submitting, setSubmitting] = useState(false)
  const [orderError, setOrderError] = useState('')
  const orderKey = useRef(null)

  useEffect(() => {
    let active = true

    async function loadAddresses() {
      if (!user?.id) {
        if (active) {
          setAddresses([])
          setAddressesLoading(false)
        }
        return
      }

      setAddressesLoading(true)
      setAddressError('')

      try {
        const savedAddresses = await fetchAddresses(user.id)
        if (!active) return
        const nextAddresses = Array.isArray(savedAddresses) ? savedAddresses : []
        setAddresses(nextAddresses)
        setSelectedAddressId((currentId) => currentId || String(
          nextAddresses.find((address) => address.is_default)?.id
          || nextAddresses[0]?.id
          || '',
        ))
      } catch (error) {
        if (active) setAddressError(getErrorMessage(error, 'Unable to load your saved addresses.'))
      } finally {
        if (active) setAddressesLoading(false)
      }
    }

    loadAddresses()

    return () => {
      active = false
    }
  }, [user?.id])

  const handleAddressChange = (event) => {
    const { checked, name, type, value } = event.target
    setAddressValues((currentValues) => ({
      ...currentValues,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const selectAddress = (addressId) => {
    orderKey.current = null
    setSelectedAddressId(String(addressId))
    setOrderError('')
  }

  const saveAddress = async () => {
    const requiredFields = ['full_name', 'phone', 'address_line_1', 'city', 'state', 'postal_code', 'country']
    if (requiredFields.some((field) => !String(addressValues[field]).trim())) {
      setAddressError('Complete all required delivery address fields.')
      return
    }

    setSavingAddress(true)
    setAddressError('')

    try {
      const address = await createAddress(addressValues, user.id)
      setAddresses((currentAddresses) => [
        ...currentAddresses.map((currentAddress) => (
          address.is_default ? { ...currentAddress, is_default: false } : currentAddress
        )),
        address,
      ])
      selectAddress(address.id)
      setAddressValues(initialAddressValues)
      setShowAddressForm(false)
    } catch (error) {
      setAddressError(getErrorMessage(error, 'Unable to save this delivery address.'))
    } finally {
      setSavingAddress(false)
    }
  }

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0 || submitting) return
    if (!selectedAddressId) {
      setOrderError('Select or add a delivery address before placing your order.')
      return
    }

    if (!orderKey.current) orderKey.current = crypto.randomUUID()
    setSubmitting(true)
    setOrderError('')

    let attempt = null
    let paymentCompleted = false

    try {
      if (paymentMethod === 'cod') {
        const order = await placeOrder(Number(selectedAddressId), orderKey.current, user.id)
        await refreshCart()
        navigate(`/order-success/${order.id}`, { replace: true })
        return
      }

      attempt = await createRazorpayOrder(Number(selectedAddressId), orderKey.current, user.id)
      await loadRazorpayScript()
      const payment = await openRazorpayCheckout(attempt)
      paymentCompleted = true
      const order = await verifyRazorpayPayment({
        order_id: attempt.order_id,
        razorpay_order_id: payment.razorpay_order_id,
        razorpay_payment_id: payment.razorpay_payment_id,
        razorpay_signature: payment.razorpay_signature,
      }, user.id)
      await refreshCart()
      navigate(`/order-success/${order.id}`, { replace: true })
    } catch (error) {
      if (attempt && !paymentCompleted) {
        try {
          await markRazorpayPaymentFailed(attempt, error, user.id)
          orderKey.current = null
        } catch {
          // Keep the cart and pending reservation intact when failure reporting cannot reach the server.
        }
      }

      const fallback = paymentCompleted
        ? 'We received your payment response but could not confirm it yet. Your cart is unchanged; check your orders shortly before retrying.'
        : 'Unable to complete the payment. Your cart is still available.'
      setOrderError(getErrorMessage(error, fallback))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">Checkout</div>
          <h1>Complete your order</h1>
        </div>
      </div>

      <section className="container py-4">
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="panel">
              <h2 className="h5 fw-bold">1. Delivery Address</h2>

              {addressError && (
                <div className="alert alert-warning mt-3" role="alert">
                  {addressError}
                  <button
                    className="btn btn-link btn-sm ms-2 p-0"
                    onClick={() => setShowAddressForm(true)}
                    type="button"
                  >
                    Add an address
                  </button>
                </div>
              )}

              {addressesLoading ? (
                <p className="small text-secondary mt-3" role="status">Loading saved addresses...</p>
              ) : addresses.length > 0 && (
                <div className="d-grid gap-2 mt-3">
                  {addresses.map((address) => (
                    <label
                      className={`border rounded-3 p-3 ${String(address.id) === selectedAddressId ? 'border-success' : ''}`}
                      key={address.id}
                    >
                      <input
                        checked={String(address.id) === selectedAddressId}
                        className="form-check-input me-2"
                        name="selected-address"
                        onChange={() => selectAddress(address.id)}
                        type="radio"
                      />
                      <b>{address.full_name}</b>
                      {address.is_default && <span className="badge text-bg-success ms-2">Default</span>}
                      <small className="d-block text-secondary ms-4">{addressText(address)}</small>
                      <small className="d-block text-secondary ms-4">{address.phone}</small>
                    </label>
                  ))}
                </div>
              )}

              <button
                className="btn btn-outline-success btn-sm mt-3"
                onClick={() => {
                  setAddressError('')
                  setShowAddressForm((visible) => !visible)
                }}
                type="button"
              >
                {showAddressForm ? 'Cancel new address' : addresses.length ? 'Add a new address' : 'Add a delivery address'}
              </button>

              {showAddressForm && (
                <fieldset className="border rounded-3 p-3 mt-3">
                  <legend className="float-none w-auto px-2 h6 mb-0">New delivery address</legend>
                  <div className="row g-3 mt-1">
                    <div className="col-md-6">
                      <label className="form-label small" htmlFor="full_name">Full Name</label>
                      <input className="form-control" id="full_name" name="full_name" onChange={handleAddressChange} required value={addressValues.full_name} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small" htmlFor="phone">Phone</label>
                      <input className="form-control" id="phone" name="phone" onChange={handleAddressChange} required type="tel" value={addressValues.phone} />
                    </div>
                    <div className="col-12">
                      <label className="form-label small" htmlFor="address_line_1">Address</label>
                      <input className="form-control" id="address_line_1" name="address_line_1" onChange={handleAddressChange} placeholder="House / street / landmark" required value={addressValues.address_line_1} />
                    </div>
                    <div className="col-12">
                      <label className="form-label small" htmlFor="address_line_2">Apartment, suite, or landmark <span className="text-secondary">(optional)</span></label>
                      <input className="form-control" id="address_line_2" name="address_line_2" onChange={handleAddressChange} value={addressValues.address_line_2} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small" htmlFor="postal_code">PIN</label>
                      <input className="form-control" id="postal_code" name="postal_code" onChange={handleAddressChange} required value={addressValues.postal_code} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small" htmlFor="city">City</label>
                      <input className="form-control" id="city" name="city" onChange={handleAddressChange} required value={addressValues.city} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small" htmlFor="state">State</label>
                      <input className="form-control" id="state" name="state" onChange={handleAddressChange} required value={addressValues.state} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small" htmlFor="country">Country</label>
                      <input className="form-control" id="country" name="country" onChange={handleAddressChange} required value={addressValues.country} />
                    </div>
                    <div className="col-md-6 d-flex align-items-end">
                      <label className="form-check mb-2">
                        <input checked={addressValues.is_default} className="form-check-input" name="is_default" onChange={handleAddressChange} type="checkbox" />
                        <span className="form-check-label">Make this my default address</span>
                      </label>
                    </div>
                  </div>
                  <button className="btn btn-success btn-sm mt-3" disabled={savingAddress} onClick={saveAddress} type="button">
                    {savingAddress ? 'Saving address...' : 'Save address'}
                  </button>
                </fieldset>
              )}

              <h2 className="h5 fw-bold mt-5">2. Payment Method</h2>
              <div className="d-grid gap-2 mt-3">
                <label className={`border rounded-3 p-3 ${paymentMethod === 'cod' ? 'border-success' : ''}`}>
                  <input checked={paymentMethod === 'cod'} className="form-check-input me-2" name="payment-method" onChange={() => setPaymentMethod('cod')} type="radio" />
                  <b>Cash on Delivery</b>
                  <small className="d-block text-secondary ms-4">Pay when your groceries are delivered.</small>
                </label>
                <label className={`border rounded-3 p-3 ${paymentMethod === 'razorpay' ? 'border-success' : ''}`}>
                  <input checked={paymentMethod === 'razorpay'} className="form-check-input me-2" name="payment-method" onChange={() => setPaymentMethod('razorpay')} type="radio" />
                  <b>Pay Online with Razorpay</b>
                  <small className="d-block text-secondary ms-4">Secure UPI, card, and net banking payment in Razorpay Test Mode.</small>
                </label>
              </div>

              {cartError && (
                <div className="alert alert-warning mt-3" role="alert">
                  {cartError}
                  <button className="btn btn-link btn-sm ms-2 p-0" onClick={retryCart} type="button">Retry cart</button>
                </div>
              )}
              {orderError && <div className="alert alert-danger mt-3" role="alert">{orderError}</div>}
              {cartItems.length === 0 && !cartLoading && (
                <p className="small text-danger mt-3 mb-0">Your cart is empty. Add products before placing an order.</p>
              )}

              <button
                className="btn btn-success mt-4 px-4"
                disabled={cartItems.length === 0 || cartLoading || savingAddress || submitting || !selectedAddressId}
                onClick={handlePlaceOrder}
                type="button"
              >
                {submitting ? 'Processing payment...' : paymentMethod === 'razorpay' ? 'Pay securely with Razorpay' : 'Place Order'}
              </button>
            </div>
          </div>

          <div className="col-lg-5">
            <aside className="summary">
              <h2 className="h5 fw-bold">Order Summary</h2>
              <div className="d-flex justify-content-between mt-4">
                <span>Items</span>
                <b>{cartCount}</b>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Subtotal</span>
                <b>{formatCurrency(subtotal)}</b>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Delivery</span>
                <b>{formatCurrency(deliveryCharge)}</b>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <b>Total</b>
                <b>{formatCurrency(grandTotal)}</b>
              </div>
              {cartItems.length === 0 && (
                <Link className="btn btn-outline-success w-100 mt-3" to="/shop">Shop Groceries</Link>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export default Checkout
