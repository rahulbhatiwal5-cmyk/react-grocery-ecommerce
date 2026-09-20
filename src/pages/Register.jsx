import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setFeedback(null)

    if (Object.values(form).some((value) => !value.trim())) {
      setFeedback({
        type: 'danger',
        text: 'Complete all fields to create an account.',
      })

      return
    }

    if (!form.email.includes('@')) {
      setFeedback({
        type: 'danger',
        text: 'Enter a valid email address.',
      })

      return
    }

    if (form.password.length < 8) {
      setFeedback({
        type: 'danger',
        text: 'Use a password with at least 8 characters.',
      })

      return
    }

    if (form.password !== form.passwordConfirmation) {
      setFeedback({
        type: 'danger',
        text: 'Password confirmation does not match.',
      })

      return
    }

    try {
      setLoading(true)

      await register({
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        password: form.password,
        password_confirmation: form.passwordConfirmation,
      })

      navigate('/account')
    } catch (error) {
      const validationErrors = error.response?.data?.errors

      let message =
        error.response?.data?.message ||
        'Unable to create account. Please try again.'

      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0]

        if (Array.isArray(firstError) && firstError.length > 0) {
          message = firstError[0]
        }
      }

      setFeedback({
        type: 'danger',
        text: message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="container py-5">
      <div
        className="panel mx-auto"
        style={{ maxWidth: '520px' }}
      >
        <div className="text-center">
          <div className="eyebrow">
            Join GreenBasket
          </div>

          <h1 className="fw-bold">
            Create Account
          </h1>
        </div>

        {feedback && (
          <div
            className={`alert alert-${feedback.type} small mt-3 mb-3`}
            role="alert"
          >
            {feedback.text}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          <div className="row g-3 mt-2">

            <div className="col-md-6">
              <label
                className="visually-hidden"
                htmlFor="register-first-name"
              >
                First name
              </label>

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
              <label
                className="visually-hidden"
                htmlFor="register-last-name"
              >
                Last name
              </label>

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
              <label
                className="visually-hidden"
                htmlFor="register-email"
              >
                Email
              </label>

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
              <label
                className="visually-hidden"
                htmlFor="register-password"
              >
                Password
              </label>

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

            <div className="col-12">
              <label
                className="visually-hidden"
                htmlFor="register-password-confirmation"
              >
                Confirm password
              </label>

              <input
                className="form-control"
                id="register-password-confirmation"
                name="passwordConfirmation"
                type="password"
                value={form.passwordConfirmation}
                onChange={handleChange}
                placeholder="Confirm password"
                autoComplete="new-password"
                required
              />
            </div>

          </div>

          <button
            className="btn btn-success w-100 mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

        </form>

        <p className="text-center small mt-3 mb-0">
          Already registered?{' '}
          <Link
            className="text-success fw-bold"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Register