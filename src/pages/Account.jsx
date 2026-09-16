import { Link } from 'react-router-dom'

function Account() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Account</div>
          <h1>Welcome back</h1>
        </div>
      </section>

      <section className="container py-4">
        <div className="row g-3">
          <div className="col-md-4">
            <Link className="panel d-block h-100 text-dark" to="/orders">
              <h2 className="h5 fw-bold">My Orders</h2>
              <p className="text-secondary small mb-0">View history and track deliveries.</p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link className="panel d-block h-100 text-dark" to="/wishlist">
              <h2 className="h5 fw-bold">Wishlist</h2>
              <p className="text-secondary small mb-0">Your saved grocery items.</p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link className="panel d-block h-100 text-dark" to="/contact">
              <h2 className="h5 fw-bold">Help &amp; Support</h2>
              <p className="text-secondary small mb-0">Contact our support team.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Account
