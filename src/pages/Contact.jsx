import { PageHeader } from './PageParts'

function Contact() {
  return <><PageHeader title="Contact us" description="Our support team is here to help with your order." /><section className="container py-4 py-md-5"><div className="row g-4"><div className="col-lg-5"><div className="panel h-100"><h2 className="h5 fw-bold">Get in touch</h2><p className="small text-muted mt-3">Email us at support@greenbasket.example or call 1800-123-4567.</p><p className="small text-muted mt-3 mb-0">We are available Monday to Sunday, 8:00 AM to 8:00 PM.</p></div></div><div className="col-lg-7"><form className="panel"><h2 className="h5 fw-bold mb-3">Send a message</h2><label className="form-label small">Name</label><input className="form-control mb-3" required /><label className="form-label small">Email</label><input className="form-control mb-3" type="email" required /><label className="form-label small">How can we help?</label><textarea className="form-control mb-3" rows="5" required /><button className="btn btn-success" type="submit">Send message</button></form></div></div></section></>
}

export default Contact
