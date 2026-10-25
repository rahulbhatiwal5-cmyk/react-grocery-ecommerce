import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getCategories } from '../../services/categoryService'
import CategoryCard from '../category/CategoryCard'

function TopCategories() {
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState('loading')
  useEffect(() => {
    const controller = new AbortController()
    getCategories(controller.signal).then((items) => { setCategories(items); setStatus('ready') })
      .catch((error) => { if (error.code !== 'ERR_CANCELED') setStatus('error') })
    return () => controller.abort()
  }, [])
  return (
    <section className="mt-5">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="section-title h4 mb-0">
          Top Categories
        </h2>

        <Link className="link-green" to="/categories">
          View all →
        </Link>
      </div>

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

    </section>
  )
}

export default TopCategories