import { Routes, Route } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Category from '../pages/Category'
import Categories from '../pages/Categories'
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
      </Route>
    </Routes>
  )
}

export default AppRoutes