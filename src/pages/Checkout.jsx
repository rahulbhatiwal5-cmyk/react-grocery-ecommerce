import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useCart from '../hooks/useCart'

const initialFormValues = {
  fullName: 'Rahul Sharma',
  phone: '+91 9876543210',
  address: '',
  pin: '201301',
  city: 'Noida',
  state: 'Uttar Pradesh',
  paymentMethod: 'online',
}

function Checkout() {
  const navigate = useNavigate()
  const {
    cartCount,
    cartItems,
    clearCart,
    deliveryCharge,
    grandTotal,
    subtotal,
  } = useCart()
  const [formValues, setFormValues] = useState(initialFormValues)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (cartItems.length === 0) {
      return
    }

    const orderNumber = `GB-${Date.now().toString().slice(-6)}`
    const orderTotal = grandTotal

    clearCart()
    navigate('/order-success', {
      state: { orderNumber, grandTotal: orderTotal },
    })
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
            <form className="panel" onSubmit={handleSubmit}>
              <h2 className="h5 fw-bold">1. Delivery Address</h2>

              <div className="row g-3 mt-1">
                <div className="col-md-6">
                  <label className="form-label small" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    onChange={handleChange}
                    required
                    value={formValues.fullName}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    className="form-control"
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    required
                    type="tel"
                    value={formValues.phone}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small" htmlFor="address">
                    Address
                  </label>
                  <input
                    className="form-control"
                    id="address"
                    name="address"
                    onChange={handleChange}
                    placeholder="House / street / landmark"
                    required
                    value={formValues.address}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label small" htmlFor="pin">
                    PIN
                  </label>
                  <input
                    className="form-control"
                    id="pin"
                    name="pin"
                    onChange={handleChange}
                    required
                    value={formValues.pin}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label small" htmlFor="city">
                    City
                  </label>
                  <input
                    className="form-control"
                    id="city"
                    name="city"
                    onChange={handleChange}
                    required
                    value={formValues.city}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label small" htmlFor="state">
                    State
                  </label>
                  <input
                    className="form-control"
                    id="state"
                    name="state"
                    onChange={handleChange}
                    required
                    value={formValues.state}
                  />
                </div>
              </div>

              <h2 className="h5 fw-bold mt-5">2. Payment Method</h2>

              <div className="d-grid gap-2">
                <label className="border rounded-3 p-3">
                  <input
                    checked={formValues.paymentMethod === 'online'}
                    name="paymentMethod"
                    onChange={handleChange}
                    type="radio"
                    value="online"
                  />
                  {' '}UPI / Card
                </label>

                <label className="border rounded-3 p-3">
                  <input
                    checked={formValues.paymentMethod === 'cash'}
                    name="paymentMethod"
                    onChange={handleChange}
                    type="radio"
                    value="cash"
                  />
                  {' '}Cash on Delivery
                </label>
              </div>

              {cartItems.length === 0 && (
                <p className="small text-danger mt-3 mb-0">
                  Your cart is empty. Add products before placing an order.
                </p>
              )}

              <button
                className="btn btn-success mt-4 px-4"
                disabled={cartItems.length === 0}
                type="submit"
              >
                Place Order
              </button>
            </form>
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
                <b>₹{subtotal}</b>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Delivery</span>
                <b>₹{deliveryCharge}</b>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <b>Total</b>
                <b>₹{grandTotal}</b>
              </div>
              {cartItems.length === 0 && (
                <Link className="btn btn-outline-success w-100 mt-3" to="/shop">
                  Shop Groceries
                </Link>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export default Checkout
