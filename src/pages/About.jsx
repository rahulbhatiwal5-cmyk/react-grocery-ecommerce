import { Link } from 'react-router-dom'
import { PageHeader } from './PageParts'

function About() {
  return <><PageHeader title="About GreenBasket" description="A simpler, fresher way to fill your kitchen." /><section className="container py-4 py-md-5"><div className="row g-4 align-items-center"><div className="col-lg-6"><div className="css-banner darkgreen"><div className="banner-copy"><span className="eyebrow text-white">Our promise</span><h3>Good food should be easy to get.</h3></div><div className="mini-basket" /></div></div><div className="col-lg-6"><h2 className="section-title">Freshness, without the fuss.</h2><p className="text-muted mb-3">GreenBasket brings produce, pantry staples, and everyday essentials together in one dependable grocery shop.</p><p className="text-muted mb-4">We work to make every delivery simple, thoughtful, and full of quality products you can trust.</p><Link className="btn btn-success" to="/shop">Shop groceries</Link></div></div></section></>
}

export default About
