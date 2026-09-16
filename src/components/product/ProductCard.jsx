import { Link } from 'react-router-dom'

import useCart from '../../hooks/useCart'
import useWishlist from '../../hooks/useWishlist'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()

  const productLabel =
    product.category === 'produce'
      ? ''
      : product.name.split(' ')[0].toUpperCase()

  return (
    <div className="col-6 col-md-4 col-xl-3">
      <article className="product-card">

        <div className="product-media">

          <span className="discount">
            {product.discount}
          </span>

          <button
            className={`wishlist-btn ${
              isWishlisted(product.id) ? 'text-success' : ''
            }`}
            type="button"
            aria-label={`Add ${product.name} to wishlist`}
            aria-pressed={isWishlisted(product.id)}
            onClick={() => toggleWishlist(product)}
          >
            {isWishlisted(product.id) ? '♥' : '♡'}
          </button>

          <div
            className={`visual ${product.category} ${
              product.id === 1 ? 'milk' : ''
            }`}
          >
            <div className="product-object">
              {productLabel}
            </div>
          </div>

        </div>

        <Link
          className="product-name d-block text-dark"
          to={`/products/${product.id}`}
        >
          {product.name}
        </Link>

        <div className="product-meta">
          {product.unit} · Quality checked
        </div>

        <div className="d-flex align-items-center justify-content-between">

          <div>
            <span className="price">
              ₹{product.price}
            </span>

            {' '}

            <del className="old-price">
              ₹{product.oldPrice}
            </del>
          </div>

          <button
            className="add-btn"
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => addToCart(product)}
          >
            +
          </button>

        </div>

      </article>
    </div>
  )
}

export default ProductCard
