import { Link, Navigate, useNavigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

function Account() {
  const navigate = useNavigate()

  const {
    user,
    loading,
    isAuthenticated,
    logout,
  } = useAuth()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div
          className="spinner-border text-success"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <section className="page-head">
        <div className="container">

          <div className="eyebrow">
            Account
          </div>

          <h1>
            Welcome back, {user.name}
          </h1>

          <p className="text-secondary mb-0">
            {user.email}
          </p>

        </div>
      </section>

      <section className="container py-4">

        <div className="row g-3">

          <div className="col-md-4">
            <Link
              className="panel d-block h-100 text-dark"
              to="/orders"
            >
              <h2 className="h5 fw-bold">
                My Orders
              </h2>

              <p className="text-secondary small mb-0">
                View history and track deliveries.
              </p>
            </Link>
          </div>

          <div className="col-md-4">
            <Link
              className="panel d-block h-100 text-dark"
              to="/wishlist"
            >
              <h2 className="h5 fw-bold">
                Wishlist
              </h2>

              <p className="text-secondary small mb-0">
                Your saved grocery items.
              </p>
            </Link>
          </div>

          <div className="col-md-4">
            <Link
              className="panel d-block h-100 text-dark"
              to="/contact"
            >
              <h2 className="h5 fw-bold">
                Help &amp; Support
              </h2>

              <p className="text-secondary small mb-0">
                Contact our support team.
              </p>
            </Link>
          </div>

        </div>

        <div className="mt-4">

          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </section>
    </>
  )
}

export default Account