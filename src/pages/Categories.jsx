import { useEffect, useState } from 'react'
import { getCategories } from '../services/categoryService'
import CategoryCard from '../components/category/CategoryCard'

function Categories() {
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState('loading')
  useEffect(() => {
    const controller = new AbortController()
    getCategories(controller.signal).then((items) => { setCategories(items); setStatus('ready') })
      .catch((error) => { if (error.code !== 'ERR_CANCELED') setStatus('error') })
    return () => controller.abort()
  }, [])
  return (
    <>
      <div className="page-head">
        <div className="container">

          <div className="eyebrow">
            CATEGORIES
          </div>

          <h1>
            Shop by category
          </h1>

          <p className="text-secondary mb-0">
            Find groceries and daily essentials by category.
          </p>

        </div>
      </div>

      <div className="container py-4">

        <div className="row g-3">

          {status === 'loading' && <p>Loading categories?</p>}
        {status === 'error' && <p className="text-danger">Unable to load categories. Please try again.</p>}
        {status === 'ready' && categories.length === 0 && <p>No categories available yet.</p>}
        {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}

        </div>

      </div>
    </>
  )
}

export default Categories