import { Link } from 'react-router-dom'

function NotFound() {
  return <section className="container py-5" style={{ maxWidth: '700px' }}><div className="panel text-center py-5"><span className="eyebrow">404</span><h1 className="mt-2">This page is not on the shelf.</h1><p className="text-muted mb-4">The page you are looking for may have moved or no longer exists.</p><Link className="btn btn-success" to="/">Back to home</Link></div></section>
}

export default NotFound
