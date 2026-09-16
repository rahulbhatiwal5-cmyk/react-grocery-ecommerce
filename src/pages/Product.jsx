import { Link, useParams } from 'react-router-dom'
import { GroceryVisual, ProductCard } from './PageParts'
import { products } from '../data/catalog'

function Product() {
  const { productSlug } = useParams()
  const product = products.find((item) => item.slug === productSlug) || products[0]
  return (
    <section className="container py-4 py-md-5">
      <Link className="link-green d-inline-block mb-4" to="/shop">← Back to shop</Link>
      <div className="row g-4 align-items-start">
        <div className="col-lg-6"><div className="product-detail-image"><GroceryVisual kind={product.visual} label={product.name.split(' ')[0]} /></div></div>
        <div className="col-lg-6"><div className="panel">
          <span className="eyebrow">Freshly packed</span><h1 className="mt-2 mb-2">{product.name}</h1><p className="text-muted mb-3">{product.unit} · Selected for freshness and delivered with care.</p>
          <div className="mb-4"><span className="price fs-3">₹{product.price}</span>{product.oldPrice > 0 && <del className="old-price fs-6">₹{product.oldPrice}</del>}</div>
          <div className="d-flex flex-wrap gap-3 align-items-center"><div className="qty"><button type="button" aria-label="Decrease quantity">−</button><span>1</span><button type="button" aria-label="Increase quantity">+</button></div><Link className="btn btn-success px-4" to="/cart">Add to cart</Link><button className="btn btn-outline-success" type="button">♡ Save</button></div>
          <hr /><p className="small text-muted">Free delivery on orders above ₹499. Your order will be packed after you place it.</p>
        </div></div>
      </div>
      <div className="mt-5"><h2 className="section-title">You may also like</h2><div className="list-grid d-grid mt-3">{products.filter((item) => item.slug !== product.slug).slice(0, 4).map((item) => <ProductCard product={item} key={item.slug} />)}</div></div>
    </section>
  )
}

export default Product
