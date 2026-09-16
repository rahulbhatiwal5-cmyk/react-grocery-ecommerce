import { Link } from 'react-router-dom'

function OrderSuccess() {
  return <section className="container py-5" style={{ maxWidth: '700px' }}><div className="panel text-center py-5"><div className="fs-1 mb-3">✓</div><span className="eyebrow">Order confirmed</span><h1 className="h2 fw-bold mt-2">Your groceries are on their way!</h1><p className="text-muted mx-auto mb-4" style={{ maxWidth: '440px' }}>We have received your order and will send delivery updates as it is packed.</p><div className="d-flex justify-content-center flex-wrap gap-2"><Link className="btn btn-success" to="/orders/GB-2048">Track order</Link><Link className="btn btn-outline-success" to="/shop">Keep shopping</Link></div></div></section>
}

export default OrderSuccess
