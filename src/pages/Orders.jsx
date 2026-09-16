import { Link } from 'react-router-dom'
import { PageHeader } from './PageParts'

function Orders() {
  return <><PageHeader title="My orders" description="Your recent grocery deliveries in one place." /><section className="container py-4 py-md-5"><div className="panel"><div className="d-flex flex-column flex-md-row justify-content-between gap-3"><div><span className="eyebrow">Delivered</span><h2 className="h5 fw-bold mt-1">Order #GB-2048</h2><p className="small text-muted">Placed on 14 September 2026 · 3 items</p></div><div className="text-md-end"><b>₹468</b><br /><Link className="link-green" to="/orders/GB-2048">View order details →</Link></div></div></div><div className="panel mt-3"><p className="small text-muted mb-0">Your future orders will appear here after checkout.</p></div></section></>
}

export default Orders
