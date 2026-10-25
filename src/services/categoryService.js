import api from './api'

const visuals = {
  produce: ['apples', ''], dairy: ['milk', 'MILK'], staples: ['atta', 'ATTA'],
  snacks: ['snacks', 'SNACK'], beverages: ['coffee', 'COFFEE'], care: ['care', ''],
}
const decorate = (category) => ({ ...category, visualClass: visuals[category.slug]?.[0] || '', label: visuals[category.slug]?.[1] || '' })
export const getCategories = async (signal) => (await api.get('/categories', { signal })).data.data.map(decorate)
export const getCategory = async (slug, signal) => decorate((await api.get(`/categories/${encodeURIComponent(slug)}`, { signal })).data.data)
