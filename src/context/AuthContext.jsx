import { createContext, useEffect, useState } from 'react'

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('greenbasket_token')
  })

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setUser(null)
        setLoading(false)
        return
      }

      try {
        const response = await getCurrentUser(token)

        setUser(response.user)
      } catch {
        localStorage.removeItem('greenbasket_token')

        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [token])

  const login = async (credentials) => {
    const response = await loginUser(credentials)

    localStorage.setItem(
      'greenbasket_token',
      response.access_token,
    )

    setToken(response.access_token)
    setUser(response.user)

    return response
  }

  const register = async (data) => {
    const response = await registerUser(data)

    localStorage.setItem(
      'greenbasket_token',
      response.access_token,
    )

    setToken(response.access_token)
    setUser(response.user)

    return response
  }

  const logout = async () => {
    try {
      if (token) {
        await logoutUser(token)
      }
    } finally {
      localStorage.removeItem('greenbasket_token')

      setToken(null)
      setUser(null)
    }
  }

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    login,
    register,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext