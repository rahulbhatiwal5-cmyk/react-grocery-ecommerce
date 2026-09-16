import { Link } from 'react-router-dom'

function Register() {
  return <main className="container py-5" style={{ maxWidth: '520px' }}><div className="panel"><Link className="brand" to="/"><span className="brand-mark">G</span>Green<span className="brand-green">Basket</span></Link><h1 className="h3 fw-bold mt-4 mb-2">Create your account</h1><p className="text-muted small mb-4">Save time on every grocery order.</p><form><label className="form-label small">Full name</label><input className="form-control mb-3" placeholder="Your name" required /><label className="form-label small">Email address</label><input className="form-control mb-3" type="email" placeholder="you@example.com" required /><label className="form-label small">Password</label><input className="form-control mb-3" type="password" placeholder="Create a password" required /><button className="btn btn-success w-100" type="submit">Create account</button></form><p className="small text-muted mt-4 mb-0">Already have an account? <Link className="link-green" to="/login">Sign in</Link></p></div></main>
}

export default Register
