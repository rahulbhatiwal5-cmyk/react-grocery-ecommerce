import { Link } from 'react-router-dom'

function Login() {
  return <main className="container py-5" style={{ maxWidth: '520px' }}><div className="panel"><Link className="brand" to="/"><span className="brand-mark">G</span>Green<span className="brand-green">Basket</span></Link><h1 className="h3 fw-bold mt-4 mb-2">Welcome back</h1><p className="text-muted small mb-4">Sign in to access your orders and saved products.</p><form><label className="form-label small">Email address</label><input className="form-control mb-3" type="email" placeholder="you@example.com" required /><label className="form-label small">Password</label><input className="form-control mb-3" type="password" placeholder="••••••••" required /><button className="btn btn-success w-100" type="submit">Sign in</button></form><p className="small text-muted mt-4 mb-0">New to GreenBasket? <Link className="link-green" to="/register">Create an account</Link></p></div></main>
}

export default Login
