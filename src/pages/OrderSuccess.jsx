import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import { fetchOrder } from '../services/orderService'

function formatCurrency(amount) {
  return `₹${Number(amount || 0).toLocaleString('en-IN')}`
}

function OrderSuccess() {
  const { orderId } = useParams()
  const { user } = useAuth()
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadOrder() {
      if (!user?.id || !orderId) return

      try {
        const result = await fetchOrder(orderId, user.id)
        if (active) setOrder(result)
      } catch (requestError) {
        if (active) setError(requestError.response?.data?.message || requestError.message || 'Unable to load this order.')
      }
    }

    loadOrder()

    return () => {
      active = false
    }
  }, [orderId, user?.id])

  if (!orderId) return <Navigate replace to="/orders" />

  if (error) {
    return (
      <section className="container py-5">
        <div className="panel text-center mx-auto p-5" style={{ maxWidth: '680px' }}>
          <h1 className="h3 fw-bold">Order unavailable</h1>
          <p className="text-secondary">{error}</p>
          <Link className="btn btn-success" to="/orders">View My Orders</Link>
        </div>
      </section>
    )
  }

  if (!order) return <section className="container py-5"><p role="status">Loading your order confirmation...</p></section>

  const awaitingOnlineConfirmation = order.payment_method === 'razorpay' && order.payment_status !== 'paid'

  return (
    <section className="container py-5">
      <div className="panel text-center mx-auto p-5" style={{ maxWidth: '680px' }}>
        <div className={`display-2 ${awaitingOnlineConfirmation ? 'text-warning' : 'text-success'}`}>{awaitingOnlineConfirmation ? '…' : '✓'}</div>
        <div className="eyebrow mt-3">{awaitingOnlineConfirmation ? 'Payment confirmation pending' : 'Order confirmed'}</div>
        <h1 className="fw-bold">{awaitingOnlineConfirmation ? 'We are confirming your payment' : 'Order placed successfully!'}</h1>
        <p className="text-secondary">{awaitingOnlineConfirmation ? 'Do not pay again. Refresh this page shortly or check your order details.' : 'Your groceries are on the way.'}</p>

        <div className="row g-3 text-start mt-4">
          <div className="col-6">
            <small className="text-secondary">Order ID</small>
            <b className="d-block">{order.id}</b>
          </div>
          <div className="col-6">
            <small className="text-secondary">Payment</small>
            <b className="d-block text-capitalize">{order.payment_method === 'razorpay' ? 'Razorpay · ' : 'Cash on Delivery · '}{String(order.payment_status || 'pending').replaceAll('_', ' ')}</b>
          </div>
        </div>

        <p className="small text-secondary mt-3 mb-0">Order total: <b className="text-dark">{formatCurrency(order.grand_total)}</b></p>
        <Link className="btn btn-success mt-4 px-5" to={`/orders/${order.id}`}>View Order Details</Link>
        <Link className="d-block text-success mt-3" to="/shop">Continue Shopping</Link>
      </div>
    </section>
  )
}

export default OrderSuccess
