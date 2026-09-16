import { Link, useParams } from 'react-router-dom'

import categories from '../data/categories'
import products from '../data/products'
import ProductCard from '../components/product/ProductCard'

function Category() {
  const { categorySlug } = useParams()

  const category = categories.find(
    (item) => item.slug === categorySlug
  )

  const categoryProducts = products.filter(
    (product) => product.category === categorySlug
  )

  if (!category) {
    return (
      <div className="container py-5 text-center">
        <h1 className="h3">Category not found</h1>

        <Link to="/categories" className="btn btn-success mt-3">
          View Categories
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="page-head">
        <div className="container">

          <div className="eyebrow">
            CATEGORY
          </div>

          <h1>{category.name}</h1>

          <p className="text-secondary mb-0">
            {category.description}
          </p>

        </div>
      </div>

      <div className="container py-4">

        <div className="d-flex justify-content-between align-items-center mb-3">

          <span className="small text-secondary">
            {categoryProducts.length} products
          </span>

          <Link
            to="/shop"
            className="link-green"
          >
            View all products →
          </Link>

        </div>

        <div className="row g-3">

          {categoryProducts.length > 0 ? (
            categoryProducts.map((product) => (
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
                  Products are not available in this category yet.
                </p>

              </div>

            </div>
          )}

        </div>

      </div>
    </>
  )
}

export default Category