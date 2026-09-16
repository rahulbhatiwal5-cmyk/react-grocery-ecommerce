import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import ProductCard from '../components/product/ProductCard'
import products from '../data/products'
import useCart from '../hooks/useCart'
import useWishlist from '../hooks/useWishlist'

function Product() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const [quantity, setQuantity] = useState(1)

  const product = products.find((item) => item.id === Number(productId))

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h1 className="h3">Product not found</h1>

        <p className="text-secondary">
          This product may no longer be available.
        </p>

        <Link to="/shop" className="btn btn-success mt-2">
          Browse Products
        </Link>
      </div>
    )
  }

  const productLabel = product.category === 'produce'
    ? ''
    : product.name.split(' ')[0].toUpperCase()

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    navigate('/checkout')
  }

  return (
    <section className="container py-4 py-md-5">
      <div className="small text-secondary mb-4">
        <Link className="text-secondary" to="/">Home</Link>
        {' / '}
        <Link className="text-secondary" to={`/categories/${product.category}`}>
          {product.category}
        </Link>
        {' / '}
        {product.name}
      </div>

      <div className="row g-5">
        <div className="col-lg-6">
          <div
            className={`visual ${product.category} ${
              product.id === 1 ? 'milk' : ''
            }`}
            style={{ height: '95px' }}
          >
            <div className="product-object">{productLabel}</div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="eyebrow">{product.category}</div>

          <h1 className="fw-bold mt-2">{product.name}</h1>

          <p className="text-secondary">
            {product.unit} · ★ 4.7 · 426 reviews
          </p>

          <div>
            <span className="display-6 fw-bold">₹{product.price}</span>
            {' '}
            <del className="old-price">₹{product.oldPrice}</del>
            <span className="badge text-bg-success ms-2">{product.discount}</span>
          </div>

          <p className="text-secondary mt-4">
            Fresh, quality-checked groceries for your everyday needs.
            Packed with care before dispatch.
          </p>

          <div className="d-flex flex-wrap gap-2 mt-4">
            <div className="qty">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((currentQuantity) => (
                  Math.max(1, currentQuantity - 1)
                ))}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((currentQuantity) => (
                  currentQuantity + 1
                ))}
              >
                +
              </button>
            </div>

            <button
              className="btn btn-success px-4"
              type="button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <button
              className="btn btn-outline-success px-4"
              type="button"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>

            <button
              className="btn btn-outline-success"
              type="button"
              aria-pressed={isWishlisted(product.id)}
              onClick={() => toggleWishlist(product)}
            >
              {isWishlisted(product.id) ? '♥ Saved' : '♡ Save'}
            </button>
          </div>

          <div className="benefits mt-4">
            <div className="row g-3">
              <div className="col-4 text-center">
                <div className="benefit-icon mx-auto">10</div>
                <small>Fast delivery</small>
              </div>
              <div className="col-4 text-center">
                <div className="benefit-icon mx-auto">✓</div>
                <small>Quality checked</small>
              </div>
              <div className="col-4 text-center">
                <div className="benefit-icon mx-auto">↺</div>
                <small>Easy returns</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel mt-5">
        <h2 className="h5 fw-bold">Product Details</h2>
        <p className="text-secondary mb-0">
          Product information is shown for demonstration purposes. Store this
          item as recommended on the pack.
        </p>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-5">
          <h2 className="section-title h4 mb-3">You may also like</h2>

          <div className="row g-3">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </section>
  )
}

export default Product
