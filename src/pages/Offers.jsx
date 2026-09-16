import { Link } from 'react-router-dom'
import { PageHeader, ProductCard } from './PageParts'
import { products } from '../data/catalog'

function Offers() {
  return (
    <>
      <PageHeader title="Fresh offers" description="Save more on the groceries you buy every week." />
      <section className="container py-4 py-md-5">
        <div className="row g-4 mb-5"><div className="col-md-6"><div className="css-banner green"><div className="banner-copy"><span className="eyebrow">This week only</span><h3>Up to 25% off fresh picks</h3><Link className="btn btn-success btn-sm" to="/shop">Shop the deal</Link></div><div className="mini-basket" /></div></div><div className="col-md-6"><div className="css-banner blue"><div className="banner-copy"><span className="eyebrow">New customer offer</span><h3>₹100 off your first order</h3><p className="small mb-3">Use code WELCOME100 at checkout.</p><Link className="btn btn-outline-success btn-sm" to="/shop">Start shopping</Link></div><div className="mini-basket" /></div></div></div>
        <h2 className="section-title mb-3">Deals you will love</h2><div className="list-grid d-grid">{products.filter((product) => product.discount).map((product) => <ProductCard product={product} key={product.slug} />)}</div>
      </section>
    </>
  )
}

export default Offers
