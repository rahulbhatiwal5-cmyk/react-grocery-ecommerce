import { useMemo, useState } from 'react'

import products from '../data/products'
import ProductCard from '../components/product/ProductCard'
import ShopSidebar from '../components/shop/ShopSidebar'

function Shop() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('recommended')

  const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase()

    let result = products.filter((product) => {
      const searchableText =
        `${product.name} ${product.category} ${product.unit}`.toLowerCase()

      return searchableText.includes(searchText)
    })

    if (sortBy === 'low-to-high') {
      result = [...result].sort((a, b) => a.price - b.price)
    }

    if (sortBy === 'high-to-low') {
      result = [...result].sort((a, b) => b.price - a.price)
    }

    return result
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
                {filteredProducts.length} products
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

              {filteredProducts.length > 0 ? (
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