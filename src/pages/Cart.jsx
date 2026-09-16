import { Link } from 'react-router-dom'
import { GroceryVisual, PageHeader } from './PageParts'
import { products } from '../data/catalog'

function Cart() {
  const item = products[0]
  return (
    <><PageHeader title="Your cart" description="Review your items before checkout." /><section className="container py-4 py-md-5"><div className="row g-4"><div className="col-lg-8"><div className="panel"><div className="cart-row d-flex gap-3 align-items-center"><div className="cart-thumb"><GroceryVisual kind={item.visual} label="Apple" /></div><div className="flex-grow-1"><h2 className="h6 fw-bold mb-1">{item.name}</h2><p className="small text-muted mb-2">{item.unit}</p><div className="qty"><button type="button" aria-label="Decrease quantity">−</button><span>1</span><button type="button" aria-label="Increase quantity">+</button></div></div><div className="text-end"><b>₹{item.price}</b><button className="btn btn-link btn-sm d-block text-danger p-0 mt-2" type="button">Remove</button></div></div><Link className="link-green d-inline-block mt-3" to="/shop">← Continue shopping</Link></div></div><div className="col-lg-4"><aside className="summary"><h2 className="h5 fw-bold">Order summary</h2><div className="d-flex justify-content-between small mt-3"><span>Subtotal</span><span>₹{item.price}</span></div><div className="d-flex justify-content-between small mt-2"><span>Delivery</span><span>₹40</span></div><hr /><div className="d-flex justify-content-between fw-bold"><span>Total</span><span>₹{item.price + 40}</span></div><Link className="btn btn-success w-100 mt-4" to="/checkout">Proceed to checkout</Link></aside></div></div></section></>
  )
}

export default Cart
