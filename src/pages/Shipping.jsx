import { PageHeader } from './PageParts'

function Shipping() {
  return <><PageHeader title="Shipping & delivery" description="Everything you need to know about getting your groceries." /><section className="container py-4 py-md-5" style={{ maxWidth: '900px' }}><div className="panel"><h2 className="h5 fw-bold">Delivery areas and times</h2><p className="text-muted small mt-3">Enter your delivery address at checkout to see available time slots. We offer same-day delivery in selected locations when you place your order early enough.</p><h2 className="h5 fw-bold mt-4">Delivery fees</h2><p className="text-muted small mt-3">Delivery is free on orders above ₹499. A ₹40 fee applies to orders below that amount.</p><h2 className="h5 fw-bold mt-4">Freshness promise</h2><p className="text-muted small mt-3 mb-0">Every order is carefully packed to protect freshness on its way to you.</p></div></section></>
}

export default Shipping
