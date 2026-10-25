import axios from 'axios'

const TOKEN_KEY = 'greenbasket_token'
export const AUTH_CHANGED = 'greenbasket:auth-changed'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

let refreshPromise = null

function updateToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
  window.dispatchEvent(new CustomEvent(AUTH_CHANGED, { detail: token }))
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (config.expectedUserId != null) {
    try {
      const encoded = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
      const subject = JSON.parse(atob(encoded)).sub
      if (String(subject) !== String(config.expectedUserId)) throw new Error('Session changed')
    } catch {
      return Promise.reject(new Error('Your session changed. Please retry.'))
    }
  }
  if (token && !config.skipAuth) config.headers.Authorization = `Bearer ${token}`
  config.sentToken = config.skipAuth ? null : token
  return config
})

api.interceptors.response.use(undefined, async (error) => {
  const original = error.config
  if (error.response?.status === 401 && original?._retried && original.sentToken === localStorage.getItem(TOKEN_KEY)) updateToken(null)
  if (error.response?.status !== 401 || !original || !original.sentToken || original.skipRefresh || original._retried) {
    return Promise.reject(error)
  }
  original._retried = true
  const current = localStorage.getItem(TOKEN_KEY)
  if (!current) return Promise.reject(error)
  const retrySafe = ['get', 'head', 'options'].includes((original.method || 'get').toLowerCase())
  if (current !== original.sentToken) return retrySafe ? api(original) : Promise.reject(error)

  if (!refreshPromise) {
    const tokenBeingRefreshed = current
    refreshPromise = api.post('/refresh', {}, { skipRefresh: true })
      .then(({ data }) => {
        if (!data.access_token || localStorage.getItem(TOKEN_KEY) !== tokenBeingRefreshed) throw new Error('Session changed')
        updateToken(data.access_token)
        return data.access_token
      })
      .catch((refreshError) => {
        if (localStorage.getItem(TOKEN_KEY) === tokenBeingRefreshed) updateToken(null)
        throw refreshError
      })
      .finally(() => { refreshPromise = null })
  }
  try {
    await refreshPromise
    return retrySafe ? api(original) : Promise.reject(error)
  } catch {
    return Promise.reject(error)
  }
})

export default api
