import { Link } from 'react-router-dom'

function ShopSidebar({ search, onSearchChange }) {
  return (
    <aside className="col-lg-3">
      <div className="filter-panel">

        <h6 className="fw-bold">
          Filter Products
        </h6>

        <hr />

        <label
          className="form-label small fw-semibold"
          htmlFor="productSearch"
        >
          Search
        </label>

        <input
          id="productSearch"
          type="text"
          className="form-control form-control-sm mb-3"
          placeholder="Milk, atta, apples..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />

        <label className="form-label small fw-semibold">
          Category
        </label>

        <div className="d-grid gap-2">

          <Link
            to="/shop"
            className="btn btn-sm btn-outline-success text-start"
          >
            All products
          </Link>

          <Link
            to="/categories/produce"
            className="btn btn-sm btn-light text-start"
          >
            Fruits & Vegetables
          </Link>

          <Link
            to="/categories/dairy"
            className="btn btn-sm btn-light text-start"
          >
            Dairy & Eggs
          </Link>

          <Link
            to="/categories/staples"
            className="btn btn-sm btn-light text-start"
          >
            Staples
          </Link>

          <Link
            to="/categories/snacks"
            className="btn btn-sm btn-light text-start"
          >
            Snacks
          </Link>

        </div>

        <hr />

        <label className="form-label small fw-semibold">
          Rating
        </label>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="ratingFilter"
          />

          <label
            className="form-check-label small"
            htmlFor="ratingFilter"
          >
            4★ & above
          </label>
        </div>

      </div>
    </aside>
  )
}

export default ShopSidebar