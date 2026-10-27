import api from './api'

const data = (response) => response.data.data
const session = (expectedUserId) => ({ expectedUserId })

export const fetchAddresses = async (owner) => data(await api.get('/addresses', session(owner)))
export const createAddress = async (address, owner) => data(await api.post('/addresses', address, session(owner)))
export const updateAddress = async (addressId, address, owner) => data(await api.patch(`/addresses/${addressId}`, address, session(owner)))
export const removeAddress = async (addressId, owner) => data(await api.delete(`/addresses/${addressId}`, session(owner)))
export const setDefaultAddress = async (addressId, owner) => data(await api.post(`/addresses/${addressId}/default`, {}, session(owner)))
