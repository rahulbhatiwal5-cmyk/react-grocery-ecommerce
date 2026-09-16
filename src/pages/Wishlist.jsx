import { Link } from 'react-router-dom'

import ProductCard from '../components/product/ProductCard'
import useWishlist from '../hooks/useWishlist'

function Wishlist() {
  const { wishlistItems } = useWishlist()

  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">Saved Items</div>
          <h1>My Wishlist</h1>
        </div>
      </div>

      <section className="container py-4">
        <div className="row g-3">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-12">
              <div className="panel text-center py-5">
                <div className="display-6">🛒</div>
                <h2 className="h5 mt-3">No products found</h2>
                <p className="text-secondary small">
                  Save products here to shop them later.
                </p>
                <Link className="btn btn-success btn-sm" to="/shop">
                  Browse Products
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Wishlist
