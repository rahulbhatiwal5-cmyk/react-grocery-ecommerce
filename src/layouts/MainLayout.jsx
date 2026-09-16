import { Outlet } from 'react-router-dom'

import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import MobileBottomNav from '../components/common/MobileBottomNav'

function MainLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />

      <MobileBottomNav />
    </>
  )
}

export default MainLayout