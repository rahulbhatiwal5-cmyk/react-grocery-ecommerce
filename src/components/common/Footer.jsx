import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer mt-5 pt-5">
      <div className="container">

        <div className="row g-4 pb-4">

          <div className="col-lg-4">
            <Link className="brand text-white" to="/">
              <span className="brand-mark">G</span>
              Green
              <span className="brand-green">Basket</span>
            </Link>

            <p className="small mt-3">
              Fresh groceries, delivered simply.
            </p>
          </div>

          <div className="col-6 col-lg-2">
            <h6>Shop</h6>

            <Link to="/shop">All products</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/offers">Offers</Link>
          </div>

          <div className="col-6 col-lg-2">
            <h6>Account</h6>

            <Link to="/account">My account</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/wishlist">Wishlist</Link>
          </div>

          <div className="col-6 col-lg-2">
            <h6>Help</h6>

            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/shipping">Shipping</Link>
          </div>

          <div className="col-6 col-lg-2">
            <h6>Legal</h6>

            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>

        </div>

        <div className="footer-bottom py-3">
          © 2026 GreenBasket · React Grocery UI
        </div>

      </div>
    </footer>
  )
}

export default Footer