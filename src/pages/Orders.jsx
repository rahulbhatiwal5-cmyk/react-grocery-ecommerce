import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import { fetchOrders } from '../services/orderService'

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

function statusClass(status) {
  if (status === 'delivered') return 'text-bg-success'
  if (status === 'cancelled') return 'text-bg-secondary'
  if (status === 'out_for_delivery') return 'text-bg-primary'

  return 'text-bg-warning'
}

function statusLabel(status) {
  return String(status || 'pending').replaceAll('_', ' ')
}

function getErrorMessage(error) {
  return error.response?.data?.message || error.message || 'Unable to load your orders.'
}

function Orders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)

  useEffect(() => {
    let active = true

    async function loadOrders() {
      if (!user?.id) return
      setLoading(true)
      setError('')

      try {
        const results = await fetchOrders(user.id)
        if (active) setOrders(Array.isArray(results) ? results : [])
      } catch (requestError) {
        if (active) setError(getErrorMessage(requestError))
      } finally {
        if (active) setLoading(false)
      }
    }

    loadOrders()

    return () => {
      active = false
    }
  }, [user?.id, reload])

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Account</div>
          <h1>My Orders</h1>
        </div>
      </section>

      <section className="container py-4">
        {loading && <p role="status">Loading your orders...</p>}
        {error && (
          <div className="alert alert-warning" role="alert">
            {error}
            <button className="btn btn-link btn-sm ms-2 p-0" onClick={() => setReload((value) => value + 1)} type="button">Retry</button>
          </div>
        )}
        {!loading && !error && orders.length === 0 && (
          <div className="panel text-center py-5">
            <h2 className="h5">No orders yet</h2>
            <p className="small text-secondary">Your completed grocery orders will appear here.</p>
            <Link className="btn btn-success" to="/shop">Shop Groceries</Link>
          </div>
        )}
        {!loading && !error && orders.map((order) => (
          <article className="panel mb-3" key={order.id}>
            <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
              <div>
                <b>Order #{order.id}</b>
                <small className="d-block text-secondary">{formatDate(order.placed_at)} · {order.item_count} items</small>
              </div>
              <span className={`badge text-capitalize ${statusClass(order.status)}`}>{statusLabel(order.status)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center gap-3">
              <div><b>{formatCurrency(order.grand_total)}</b><small className="d-block text-secondary text-capitalize">{order.payment_method === 'razorpay' ? 'Razorpay' : 'Cash on delivery'} · {statusLabel(order.payment_status)}</small></div>
              <Link className="link-green" to={`/orders/${order.id}`}>View Details</Link>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

export default Orders
