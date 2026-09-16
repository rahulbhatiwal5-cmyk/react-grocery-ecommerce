import { Link } from 'react-router-dom'
import orders from '../data/orders'

function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`
}

function Orders() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Account</div>
          <h1>My Orders</h1>
        </div>
      </section>

      <section className="container py-4">
        {orders.map((order) => (
          <article className="panel mb-3" key={order.id}>
            <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
              <div>
                <b>Order #{order.id}</b>
                <small className="d-block text-secondary">{order.placedText} · {order.itemCount} items</small>
              </div>
              <span className={`badge ${order.statusClass}`}>{order.status}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center gap-3">
              <b>{formatCurrency(order.total)}</b>
              <Link className="link-green" to={`/orders/${order.id}`}>View Details</Link>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

export default Orders
