import { Link, useParams } from 'react-router-dom'
import orders, { getOrderSubtotal } from '../data/orders'

const trackingSteps = ['Placed', 'Confirmed', 'Packed', 'Out for delivery', 'Delivered']

function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`
}

function OrderDetail() {
  const { orderId } = useParams()
  const order = orders.find((item) => item.id === orderId)

  if (!order) {
    return (
      <section className="container py-5" style={{ maxWidth: '720px' }}>
        <div className="panel text-center py-5">
          <div className="eyebrow">Order tracking</div>
          <h1 className="h3 fw-bold mt-2">Order not found</h1>
          <p className="text-secondary small mb-4">We could not find an order with that reference.</p>
          <Link className="btn btn-success" to="/orders">All Orders</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
        <div>
          <div className="eyebrow">Order tracking</div>
          <h1 className="fw-bold mb-1">#{order.id}</h1>
          <p className="text-secondary mb-0">{order.placedText} at {order.placedAt}</p>
        </div>
        <Link className="btn btn-outline-success btn-sm flex-shrink-0" to="/orders">All Orders</Link>
      </div>

      <div className="panel">
        <div className="row g-3 mb-5">
          {trackingSteps.map((step, index) => {
            const completed = index <= order.progress
            return (
              <div className={`col track-step ${completed ? 'done' : ''}`} key={step}>
                <div className="track-dot">{completed ? '✓' : '•'}</div>
                <small>{step}</small>
              </div>
            )
          })}
        </div>

        <div className="row g-4">
          <section className="col-lg-7" aria-labelledby="order-items-title">
            <h2 className="h5 fw-bold" id="order-items-title">Order Items</h2>
            {order.items.map((item) => (
              <div className="cart-row d-flex gap-3 align-items-center" key={`${item.name}-${item.unit}`}>
                <div className={`visual ${item.visual} flex-shrink-0`} style={{ width: '95px', height: '95px', minHeight: '95px' }} aria-hidden="true">
                  <div className="product-object">{item.label}</div>
                </div>
                <div className="flex-grow-1">
                  <b>{item.name}</b>
                  <small className="d-block text-secondary">{item.unit} × {item.quantity}</small>
                </div>
                <b>{formatCurrency(item.price * item.quantity)}</b>
              </div>
            ))}
            <div className="d-flex justify-content-between pt-3">
              <b>Total</b>
              <b>{formatCurrency(order.total)}</b>
            </div>
            {order.deliveryCharge > 0 && (
              <p className="text-secondary small text-end mb-0">Includes {formatCurrency(order.deliveryCharge)} delivery</p>
            )}
          </section>

          <section className="col-lg-5" aria-labelledby="delivery-address-title">
            <h2 className="h5 fw-bold" id="delivery-address-title">Delivery Address</h2>
            <p className="text-secondary small mb-0">
              {order.deliveryAddress.name}<br />
              {order.deliveryAddress.line1}<br />
              {order.deliveryAddress.line2}
            </p>
            <hr />
            <div className="d-flex justify-content-between small">
              <span className="text-secondary">Item subtotal</span>
              <span>{formatCurrency(getOrderSubtotal(order))}</span>
            </div>
            <div className="d-flex justify-content-between small mt-2">
              <span className="text-secondary">Delivery</span>
              <span>{order.deliveryCharge ? formatCurrency(order.deliveryCharge) : 'Free'}</span>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default OrderDetail
