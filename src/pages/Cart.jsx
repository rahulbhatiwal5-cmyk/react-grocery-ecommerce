import { Link } from 'react-router-dom'

import useCart from '../hooks/useCart'

function Cart() {
  const {
    cartItems,
    cartCount,
    decreaseQuantity,
    deliveryCharge,
    grandTotal,
    increaseQuantity,
    removeFromCart,
    subtotal,
  } = useCart()

  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">Your Cart</div>
          <h1>Shopping Cart</h1>
        </div>
      </div>

      <section className="container py-4">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="panel">
              {cartItems.length > 0 ? (
                cartItems.map((item) => {
                  const productLabel = item.category === 'produce'
                    ? ''
                    : item.name.split(' ')[0].toUpperCase()

                  return (
                    <div className="cart-row d-flex align-items-center gap-3" key={item.id}>
                      <div
                        className={`cart-thumb visual ${item.category} ${
                          item.id === 1 ? 'milk' : ''
                        }`}
                      >
                        <div className="product-object">{productLabel}</div>
                      </div>

                      <div className="flex-grow-1">
                        <b className="d-block">{item.name}</b>
                        <small className="text-secondary">{item.unit}</small>

                        <div className="qty mt-2">
                          <button
                            type="button"
                            aria-label={`Decrease ${item.name} quantity`}
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Increase ${item.name} quantity`}
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-end">
                        <b>₹{item.price * item.quantity}</b>
                        <button
                          className="btn btn-sm text-danger d-block ms-auto px-0"
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-5">
                  <div className="display-5">🛒</div>
                  <h2 className="h5 mt-3">Your cart is empty</h2>
                  <p className="text-secondary small">
                    Add fresh groceries to get started.
                  </p>
                  <Link className="btn btn-success" to="/shop">
                    Shop Groceries
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <aside className="summary">
              <h2 className="h5 fw-bold">Order Summary</h2>
              <div className="d-flex justify-content-between mt-4">
                <span className="text-secondary">Items ({cartCount})</span>
                <b>₹{subtotal}</b>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span className="text-secondary">Delivery</span>
                <b>₹{deliveryCharge}</b>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <b>Total</b>
                <b>₹{grandTotal}</b>
              </div>
              <Link
                className={`btn btn-success w-100 mt-3 ${
                  cartItems.length === 0 ? 'disabled' : ''
                }`}
                aria-disabled={cartItems.length === 0}
                to={cartItems.length > 0 ? '/checkout' : '/cart'}
              >
                Proceed to Checkout
              </Link>
              <Link className="btn btn-outline-success w-100 mt-2" to="/shop">
                Continue Shopping
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cart
