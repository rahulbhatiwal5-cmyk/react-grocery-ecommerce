import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import { fetchOrder } from '../services/orderService'

const trackingSteps = ['Placed', 'Confirmed', 'Processing', 'Out for delivery', 'Delivered']
const progressByStatus = {
  pending: 0,
  confirmed: 1,
  processing: 2,
  out_for_delivery: 3,
  delivered: 4,
}

function formatCurrency(amount) {
  return `₹${Number(amount || 0).toLocaleString('en-IN')}`
}

function formatDate(value) {
  if (!value) return 'Order date unavailable'

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function formatStatus(status) {
  return String(status || 'pending').replaceAll('_', ' ')
}

function getErrorMessage(error) {
  if (error.response?.status === 404) return 'We could not find an order with that reference.'

  return error.response?.data?.message || error.message || 'Unable to load this order.'
}

function productVisual(item) {
  const name = item.product_name?.toLowerCase() || ''
  if (name.includes('milk')) return 'milk'
  if (name.includes('atta')) return 'atta'
  if (name.includes('oil')) return 'oil'
  if (name.includes('apple')) return 'apples'
  if (name.includes('snack')) return 'snacks'

  return 'produce'
}

function OrderDetail() {
  const { orderId } = useParams()
  const { user } = useAuth()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)

  useEffect(() => {
    let active = true

    async function loadOrder() {
      if (!user?.id || !orderId) return
      setLoading(true)
      setError('')

      try {
        const result = await fetchOrder(orderId, user.id)
        if (active) setOrder(result)
      } catch (requestError) {
        if (active) setError(getErrorMessage(requestError))
      } finally {
        if (active) setLoading(false)
      }
    }

    loadOrder()

    return () => {
      active = false
    }
  }, [orderId, reload, user?.id])

  if (loading) {
    return <section className="container py-5"><p role="status">Loading your order...</p></section>
  }

  if (error || !order) {
    return (
      <section className="container py-5" style={{ maxWidth: '720px' }}>
        <div className="panel text-center py-5">
          <div className="eyebrow">Order tracking</div>
          <h1 className="h3 fw-bold mt-2">Order not found</h1>
          <p className="text-secondary small mb-4">{error || 'We could not find this order.'}</p>
          {error && <button className="btn btn-outline-success btn-sm me-2" onClick={() => setReload((value) => value + 1)} type="button">Retry</button>}
          <Link className="btn btn-success" to="/orders">All Orders</Link>
        </div>
      </section>
    )
  }

  const progress = progressByStatus[order.status]
  const address = order.shipping_address || {}

  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
        <div>
          <div className="eyebrow">Order tracking</div>
          <h1 className="fw-bold mb-1">#{order.id}</h1>
          <p className="text-secondary mb-0">Placed {formatDate(order.placed_at)}</p>
        </div>
        <Link className="btn btn-outline-success btn-sm flex-shrink-0" to="/orders">All Orders</Link>
      </div>

      <div className="panel">
        {order.status === 'cancelled' ? (
          <div className="alert alert-secondary">This order was cancelled.</div>
        ) : (
          <div className="row g-3 mb-5">
            {trackingSteps.map((step, index) => {
              const completed = index <= progress
              return (
                <div className={`col track-step ${completed ? 'done' : ''}`} key={step}>
                  <div className="track-dot">{completed ? '✓' : '•'}</div>
                  <small>{step}</small>
                </div>
              )
            })}
          </div>
        )}

        <div className="d-flex flex-wrap gap-2 mb-4">
          <span className="badge text-bg-light border text-capitalize">Status: {formatStatus(order.status)}</span>
          <span className="badge text-bg-light border text-capitalize">Payment: {formatStatus(order.payment_status)}</span>
          <span className="badge text-bg-light border text-capitalize">{order.payment_method === 'razorpay' ? 'Razorpay' : 'Cash on Delivery'}</span>
          {order.payment_id && <span className="badge text-bg-light border">Payment ID: {order.payment_id}</span>}
        </div>

        <div className="row g-4">
          <section className="col-lg-7" aria-labelledby="order-items-title">
            <h2 className="h5 fw-bold" id="order-items-title">Order Items</h2>
            {order.items?.map((item) => (
              <div className="cart-row d-flex gap-3 align-items-center" key={item.id}>
                <div className={`visual ${productVisual(item)} flex-shrink-0`} style={{ width: '95px', height: '95px', minHeight: '95px' }} aria-hidden="true">
                  <div className="product-object">{item.product_name?.split(' ')[0]?.toUpperCase() || 'ITEM'}</div>
                </div>
                <div className="flex-grow-1">
                  <b>{item.product_name}</b>
                  <small className="d-block text-secondary">{item.unit} × {item.quantity}</small>
                  <small className="d-block text-secondary">{formatCurrency(item.unit_price)} each</small>
                </div>
                <b>{formatCurrency(item.line_total)}</b>
              </div>
            ))}
            <div className="d-flex justify-content-between pt-3">
              <b>Total</b>
              <b>{formatCurrency(order.grand_total)}</b>
            </div>
          </section>

          <section className="col-lg-5" aria-labelledby="delivery-address-title">
            <h2 className="h5 fw-bold" id="delivery-address-title">Delivery Address</h2>
            <p className="text-secondary small mb-0">
              <b className="text-dark">{address.full_name}</b><br />
              {address.address_line_1}<br />
              {address.address_line_2 && <>{address.address_line_2}<br /></>}
              {[address.city, address.state, address.postal_code].filter(Boolean).join(', ')}<br />
              {address.country}<br />
              {address.phone}
            </p>
            <hr />
            <div className="d-flex justify-content-between small">
              <span className="text-secondary">Item subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="d-flex justify-content-between small mt-2">
              <span className="text-secondary">Delivery</span>
              <span>{order.delivery_charge ? formatCurrency(order.delivery_charge) : 'Free'}</span>
            </div>
            <div className="d-flex justify-content-between small mt-2 fw-bold">
              <span>Grand total</span>
              <span>{formatCurrency(order.grand_total)}</span>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default OrderDetail
