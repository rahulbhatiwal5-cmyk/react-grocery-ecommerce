import { NavLink } from 'react-router-dom'

function MobileBottomNav() {
  const getNavClass = ({ isActive }) => {
    return isActive ? 'active' : ''
  }

  return (
    <div className="mobile-bottom">

      <NavLink to="/" className={getNavClass}>
        <span>⌂</span>
        Home
      </NavLink>

      <NavLink to="/categories" className={getNavClass}>
        <span>◫</span>
        Categories
      </NavLink>

      <NavLink to="/shop" className={getNavClass}>
        <span>⌕</span>
        Search
      </NavLink>

      <NavLink to="/offers" className={getNavClass}>
        <span>％</span>
        Offers
      </NavLink>

      <NavLink to="/account" className={getNavClass}>
        <span>○</span>
        Account
      </NavLink>

    </div>
  )
}

export default MobileBottomNav