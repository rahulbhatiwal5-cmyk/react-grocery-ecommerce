import { Link } from 'react-router-dom'
import { PageHeader } from './PageParts'

function Account() {
  return <><PageHeader title="My account" description="Manage your profile, addresses, and grocery orders." /><section className="container py-4 py-md-5"><div className="row g-4"><div className="col-lg-4"><div className="panel"><div className="rounded-circle bg-success text-white d-grid place-items-center mb-3" style={{ width: '54px', height: '54px' }}>A</div><h2 className="h5 fw-bold mb-1">Alex Shopper</h2><p className="small text-muted mb-3">alex@example.com</p><Link className="btn btn-outline-success btn-sm" to="/login">Sign out</Link></div></div><div className="col-lg-8"><div className="row g-3"><div className="col-sm-6"><Link className="panel d-block text-dark h-100" to="/orders"><h2 className="h6 fw-bold">My orders</h2><p className="small text-muted">Track and review past purchases.</p></Link></div><div className="col-sm-6"><Link className="panel d-block text-dark h-100" to="/wishlist"><h2 className="h6 fw-bold">Wishlist</h2><p className="small text-muted">Products saved for later.</p></Link></div><div className="col-sm-6"><div className="panel h-100"><h2 className="h6 fw-bold">Saved address</h2><p className="small text-muted">Add an address at checkout.</p></div></div><div className="col-sm-6"><div className="panel h-100"><h2 className="h6 fw-bold">Help centre</h2><Link className="link-green" to="/contact">Contact support</Link></div></div></div></div></div></section></>
}

export default Account
