import { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [feedback, setFeedback] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (Object.values(form).some((value) => !value.trim())) {
      setFeedback({ type: 'danger', text: 'Complete all fields to create an account.' })
      return
    }

    if (!form.email.includes('@')) {
      setFeedback({ type: 'danger', text: 'Enter a valid email address.' })
      return
    }

    if (form.password.length < 6) {
      setFeedback({ type: 'danger', text: 'Use a password with at least 6 characters.' })
      return
    }

    setFeedback({ type: 'success', text: 'Account form submitted. You can sign in when authentication is connected.' })
  }

  return (
    <section className="container py-5">
      <div className="panel mx-auto" style={{ maxWidth: '520px' }}>
        <div className="text-center">
          <div className="eyebrow">Join GreenBasket</div>
          <h1 className="fw-bold">Create Account</h1>
        </div>

        {feedback && (
          <div className={`alert alert-${feedback.type} small mt-3 mb-3`} role="alert">
            {feedback.text}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <label className="visually-hidden" htmlFor="register-first-name">First name</label>
              <input
                className="form-control"
                id="register-first-name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                autoComplete="given-name"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="visually-hidden" htmlFor="register-last-name">Last name</label>
              <input
                className="form-control"
                id="register-last-name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                autoComplete="family-name"
                required
              />
            </div>
            <div className="col-12">
              <label className="visually-hidden" htmlFor="register-email">Email</label>
              <input
                className="form-control"
                id="register-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                autoComplete="email"
                required
              />
            </div>
            <div className="col-12">
              <label className="visually-hidden" htmlFor="register-password">Password</label>
              <input
                className="form-control"
                id="register-password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <button className="btn btn-success w-100 mt-4" type="submit">Create Account</button>
        </form>

        <p className="text-center small mt-3 mb-0">
          Already registered? <Link className="text-success fw-bold" to="/login">Login</Link>
        </p>
      </div>
    </section>
  )
}

export default Register
