function ProductCard({ product }) {
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
            className="wishlist-btn"
            type="button"
            aria-label={`Add ${product.name} to wishlist`}
          >
            ♡
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

        <div className="product-name">
          {product.name}
        </div>

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
          >
            +
          </button>

        </div>

      </article>
    </div>
  )
}

export default ProductCard