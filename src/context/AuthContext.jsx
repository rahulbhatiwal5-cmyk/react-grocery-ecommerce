import { createContext, useEffect, useState } from 'react'
import { AUTH_CHANGED } from '../services/api'

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
    const syncAuth = (event) => {
      setToken(event.detail)
      if (!event.detail) setUser(null)
    }
    window.addEventListener(AUTH_CHANGED, syncAuth)
    return () => window.removeEventListener(AUTH_CHANGED, syncAuth)
  }, [])

  useEffect(() => {
    let active = true
    const loadUser = async () => {
      if (!token) {
        setUser(null)
        setLoading(false)
        return
      }

      try {
        const response = await getCurrentUser()

        if (active) setUser(response.user)
      } catch (error) {
        if (!active || error.response?.status !== 401) return
        localStorage.removeItem('greenbasket_token')

        setToken(null)
        setUser(null)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadUser()
    return () => { active = false }
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
        await logoutUser()
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
