import api from './api'

export const registerUser = async (data) => (await api.post('/register', data, { skipAuth: true })).data
export const loginUser = async (data) => (await api.post('/login', data, { skipAuth: true })).data
export const getCurrentUser = async () => (await api.get('/me')).data
export const logoutUser = async () => (await api.post('/logout', {}, { skipRefresh: true })).data
export const refreshToken = async () => (await api.post('/refresh', {}, { skipRefresh: true })).data
