import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="container py-5">
      <div className="panel text-center mx-auto p-5" style={{ maxWidth: '600px' }}>
        <div className="display-1 fw-bold text-success">404</div>

        <h2 className="fw-bold">Page not found</h2>

        <Link className="btn btn-success mt-2" to="/">
          Back to Home
        </Link>
      </div>
    </section>
  )
}

export default NotFound
