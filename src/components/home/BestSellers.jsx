import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getProducts } from '../../services/productService'
import ProductCard from '../product/ProductCard'

function BestSellers() {
  const [bestSellers, setBestSellers] = useState([])
  const [status, setStatus] = useState('loading')
  useEffect(() => {
    const controller = new AbortController()
    getProducts({}, controller.signal).then((items) => { setBestSellers(items.slice(0, 4)); setStatus('ready') })
      .catch((error) => { if (error.code !== 'ERR_CANCELED') setStatus('error') })
    return () => controller.abort()
  }, [])

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

        {status === 'loading' && <p>Loading products?</p>}
        {status === 'error' && <p className="text-danger">Unable to load products. Please try again.</p>}
        {status === 'ready' && bestSellers.length === 0 && <p>No products available yet.</p>}
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