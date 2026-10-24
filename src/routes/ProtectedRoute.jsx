import { Navigate, Outlet } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth()

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div
          className="spinner-border text-success"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute