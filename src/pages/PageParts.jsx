import { Link } from 'react-router-dom'

export function PageHeader({ title, description }) {
  return (
    <section className="page-head">
      <div className="container">
        <h1 className="mb-2">{title}</h1>
        {description && <p className="text-muted">{description}</p>}
      </div>
    </section>
  )
}

export function GroceryVisual({ kind = 'milk', label = '' }) {
  return (
    <div className={`visual ${kind}`} aria-hidden="true">
      <div className="product-object">{label}</div>
    </div>
  )
}

export function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-media">
        {product.discount && <span className="discount">{product.discount}</span>}
        <button className="wishlist-btn" type="button" aria-label={`Save ${product.name}`}>♡</button>
        <GroceryVisual kind={product.visual} label={product.name.split(' ')[0]} />
      </div>
      <Link className="text-dark" to={`/products/${product.slug}`}>
        <h3 className="product-name">{product.name}</h3>
      </Link>
      <p className="product-meta">{product.unit}</p>
      <div className="d-flex align-items-center justify-content-between gap-2">
        <div>
          <span className="price">₹{product.price}</span>
          {product.oldPrice > 0 && <del className="old-price">₹{product.oldPrice}</del>}
        </div>
        <button className="add-btn quick-add" type="button" aria-label={`Add ${product.name} to cart`}>+</button>
      </div>
    </article>
  )
}

export function CategoryCard({ category }) {
  return (
    <Link className="category-card" to={`/categories/${category.slug}`}>
      <div className={`visual ${category.visual}`} style={{ height: '95px', minHeight: '95px' }}>
        <div className="product-object">{category.icon}</div>
      </div>
      <b>{category.name}</b>
      <small>{category.count} products</small>
    </Link>
  )
}

export function EmptyState({ title, text, action = 'Continue shopping', to = '/shop' }) {
  return (
    <div className="panel text-center py-5">
      <div className="fs-1 mb-3">🛒</div>
      <h2>{title}</h2>
      <p className="text-muted mb-4">{text}</p>
      <Link className="btn btn-success" to={to}>{action}</Link>
    </div>
  )
}
