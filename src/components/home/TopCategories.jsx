import { Link } from 'react-router-dom'

import categories from '../../data/categories'
import CategoryCard from '../category/CategoryCard'

function TopCategories() {
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