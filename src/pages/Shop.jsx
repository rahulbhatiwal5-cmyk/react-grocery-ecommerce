import { useEffect, useState } from 'react'

import { getProducts } from '../services/productService'
import ProductCard from '../components/product/ProductCard'
import ShopSidebar from '../components/shop/ShopSidebar'

function Shop() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('recommended')

  const [filteredProducts, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(() => {
      setStatus('loading')
      const sort = { 'low-to-high': 'price_asc', 'high-to-low': 'price_desc' }[sortBy] || 'recommended'
      getProducts({ search: search.trim(), sort }, controller.signal)
        .then((items) => { setProducts(items); setStatus('ready') })
        .catch((error) => { if (error.code !== 'ERR_CANCELED') setStatus('error') })
    }, 250)
    return () => { clearTimeout(timer); controller.abort() }
  }, [search, sortBy])

  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">
            SHOP
          </div>

          <h1>
            Fresh groceries & essentials
          </h1>

          <p className="text-secondary mb-0">
            Choose from everyday products at great prices.
          </p>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-4">

          <ShopSidebar
            search={search}
            onSearchChange={setSearch}
          />

          <section className="col-lg-9">

            <div className="d-flex justify-content-between align-items-center mb-3">

              <span className="small text-secondary">
                {status === 'ready' ? `${filteredProducts.length} products` : 'Loading products?'}
              </span>

              <select
                className="form-select form-select-sm"
                style={{ width: '180px' }}
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="recommended">
                  Recommended
                </option>

                <option value="low-to-high">
                  Price: Low to High
                </option>

                <option value="high-to-low">
                  Price: High to Low
                </option>
              </select>

            </div>

            <div className="row g-3">

              {status === 'loading' ? <p className="col-12">Loading products?</p> : status === 'error' ? <p className="col-12 text-danger">Unable to load products. Please try again.</p> : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))
              ) : (
                <div className="col-12">
                  <div className="panel text-center py-5">

                    <div className="display-6">
                      🛒
                    </div>

                    <h5 className="mt-3">
                      No products found
                    </h5>

                    <p className="text-secondary small">
                      Try a different search.
                    </p>

                  </div>
                </div>
              )}

            </div>

          </section>

        </div>
      </div>
    </>
  )
}

export default Shop