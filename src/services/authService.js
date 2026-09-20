import api from './api'

export const registerUser = async (data) => {
  const response = await api.post('/register', data)
  return response.data
}

export const loginUser = async (data) => {
  const response = await api.post('/login', data)
  return response.data
}

export const getCurrentUser = async (token) => {
  const response = await api.get('/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export const logoutUser = async (token) => {
  const response = await api.post(
    '/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}

export const refreshToken = async (token) => {
  const response = await api.post(
    '/refresh',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}