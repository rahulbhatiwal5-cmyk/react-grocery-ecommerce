import { Link, useLocation } from 'react-router-dom'
import orders from '../data/orders'

function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`
}

function OrderSuccess() {
  const location = useLocation()
  const fallbackOrder = orders[0]
  const orderNumber = typeof location.state?.orderNumber === 'string' && location.state.orderNumber.trim()
    ? location.state.orderNumber
    : fallbackOrder.id
  const suppliedTotal = Number(location.state?.grandTotal)
  const grandTotal = Number.isFinite(suppliedTotal) && suppliedTotal >= 0
    ? suppliedTotal
    : fallbackOrder.total
  const isMockOrder = orders.some((order) => order.id === orderNumber)

  return (
    <section className="container py-5">
      <div className="panel text-center mx-auto p-5" style={{ maxWidth: '680px' }}>
        <div className="display-2 text-success">✓</div>
        <div className="eyebrow mt-3">Order confirmed</div>
        <h1 className="fw-bold">Order placed successfully!</h1>
        <p className="text-secondary">Your groceries are on the way.</p>

        <div className="row g-3 text-start mt-4">
          <div className="col-6">
            <small className="text-secondary">Order ID</small>
            <b className="d-block">{orderNumber}</b>
          </div>
          <div className="col-6">
            <small className="text-secondary">Estimated delivery</small>
            <b className="d-block">Today · 10–20 mins</b>
          </div>
        </div>

        <p className="small text-secondary mt-3 mb-0">Order total: <b className="text-dark">{formatCurrency(grandTotal)}</b></p>
        <Link className="btn btn-success mt-4 px-5" to={isMockOrder ? `/orders/${orderNumber}` : '/orders'}>
          {isMockOrder ? 'Track Order' : 'View My Orders'}
        </Link>
        <Link className="d-block text-success mt-3" to="/shop">Continue Shopping</Link>
      </div>
    </section>
  )
}

export default OrderSuccess
