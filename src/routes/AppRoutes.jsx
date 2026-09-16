import { Routes, Route } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Category from '../pages/Category'
import Categories from '../pages/Categories'
import Product from '../pages/Product'
import Offers from '../pages/Offers'
import Wishlist from '../pages/Wishlist'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Account from '../pages/Account'
import Orders from '../pages/Orders'
import OrderDetail from '../pages/OrderDetail'
import OrderSuccess from '../pages/OrderSuccess'
import About from '../pages/About'
import Contact from '../pages/Contact'
import FAQ from '../pages/FAQ'
import Shipping from '../pages/Shipping'
import Privacy from '../pages/Privacy'
import Terms from '../pages/Terms'
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'
import Register from '../pages/Register'
function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route
            path="/categories/:categorySlug"
            element={<Category />}
            />
            <Route
                path="/categories"
                element={<Categories />}
                />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default AppRoutes
