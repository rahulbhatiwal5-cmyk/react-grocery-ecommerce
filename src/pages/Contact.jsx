import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
    setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">SUPPORT</div>

          <h1>How can we help?</h1>
        </div>
      </div>

      <section className="container py-5" style={{ maxWidth: '760px' }}>
        <form className="panel" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small" htmlFor="contact-name">
                Name
              </label>

              <input
                className="form-control"
                id="contact-name"
                name="name"
                onChange={handleChange}
                required
                value={formData.name}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small" htmlFor="contact-email">
                Email
              </label>

              <input
                className="form-control"
                id="contact-email"
                name="email"
                onChange={handleChange}
                required
                type="email"
                value={formData.email}
              />
            </div>

            <div className="col-12">
              <label className="form-label small" htmlFor="contact-message">
                Message
              </label>

              <textarea
                className="form-control"
                id="contact-message"
                name="message"
                onChange={handleChange}
                required
                rows="5"
                value={formData.message}
              />
            </div>
          </div>

          <button className="btn btn-success mt-3" type="submit">
            Send Message
          </button>

          {submitted && (
            <p className="small text-success mt-3 mb-0" role="status">
              Thanks for getting in touch. We&apos;ll be in touch soon.
            </p>
          )}
        </form>
      </section>
    </>
  )
}

export default Contact
