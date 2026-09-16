import { Link } from 'react-router-dom'

import products from '../../data/products'
import ProductCard from '../product/ProductCard'

function BestSellers() {
  const bestSellers = products.slice(0, 4)

  return (
    <section className="mt-5">

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h2 className="section-title h4 mb-0">
          Best Sellers
        </h2>

        <Link className="link-green" to="/shop">
          View all →
        </Link>

      </div>

      <div className="row g-3">

        {bestSellers.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  )
}

export default BestSellers