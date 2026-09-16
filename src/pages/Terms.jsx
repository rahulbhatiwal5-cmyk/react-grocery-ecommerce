import { PageHeader } from './PageParts'

function Terms() {
  return <><PageHeader title="Terms of service" description="The simple terms for using GreenBasket." /><section className="container py-4 py-md-5" style={{ maxWidth: '900px' }}><article className="panel"><h2 className="h5 fw-bold">Using our service</h2><p className="small text-muted mt-3">By placing an order, you agree to provide accurate account and delivery details and to pay the displayed price for confirmed items.</p><h2 className="h5 fw-bold mt-4">Products and availability</h2><p className="small text-muted mt-3">Product availability can change. If an item is unavailable, it will not be charged to your final order.</p><h2 className="h5 fw-bold mt-4">Delivery</h2><p className="small text-muted mt-3 mb-0">Delivery timings are estimates and may vary due to traffic, weather, and operational needs.</p></article></section></>
}

export default Terms
