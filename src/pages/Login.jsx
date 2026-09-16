import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [feedback, setFeedback] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!form.email.trim() || !form.password) {
      setFeedback({ type: 'danger', text: 'Enter your email and password to continue.' })
      return
    }

    if (!form.email.includes('@')) {
      setFeedback({ type: 'danger', text: 'Enter a valid email address.' })
      return
    }

    setFeedback({ type: 'success', text: 'Login submitted. Authentication will be connected soon.' })
  }

  return (
    <section className="container py-5">
      <div className="panel mx-auto" style={{ maxWidth: '450px' }}>
        <div className="text-center">
          <div className="eyebrow">Welcome back</div>
          <h1 className="fw-bold">Login</h1>
          <p className="text-secondary small">Login to your GreenBasket account.</p>
        </div>

        {feedback && (
          <div className={`alert alert-${feedback.type} small mt-3 mb-3`} role="alert">
            {feedback.text}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label small" htmlFor="login-email">Email</label>
            <input
              className="form-control"
              id="login-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label small" htmlFor="login-password">Password</label>
            <input
              className="form-control"
              id="login-password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <button className="btn btn-success w-100" type="submit">Login</button>
        </form>

        <p className="text-center small mt-3 mb-0">
          New here? <Link className="text-success fw-bold" to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  )
}

export default Login
