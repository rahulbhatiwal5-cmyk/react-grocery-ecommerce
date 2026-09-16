import { Link, NavLink } from 'react-router-dom'

function Header() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container py-2">

        <Link className="navbar-brand brand" to="/">
          <span className="brand-mark">G</span>
          Green
          <span className="brand-green">Basket</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">

          <div
            className="search-box mx-lg-auto my-3 my-lg-0"
            style={{
              maxWidth: '430px',
              width: '100%',
            }}
          >
            <span className="me-2">⌕</span>

            <input
              type="text"
              placeholder="Search for groceries..."
              aria-label="Search groceries"
            />
          </div>

          <ul className="navbar-nav ms-lg-3 align-items-lg-center">

            <li className="nav-item">
              <NavLink className="nav-link" to="/shop">
                Shop
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/categories">
                Categories
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/offers">
                Offers
              </NavLink>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                ♡
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/account">
                Account
              </Link>
            </li>

            <li className="nav-item ms-lg-2">
              <Link
                className="btn btn-success btn-sm"
                to="/cart"
              >
                Cart (0)
              </Link>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  )
}

export default Header