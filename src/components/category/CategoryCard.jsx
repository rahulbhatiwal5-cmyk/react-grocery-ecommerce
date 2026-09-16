import { Link } from 'react-router-dom'

function CategoryCard({ category }) {
  return (
    <div className="col-6 col-md-3 col-lg">
      <Link
        className="category-card"
        to={`/categories/${category.slug}`}
      >
        <div
          className={`visual ${category.visualClass}`}
          style={{ height: '95px' }}
        >
          <div className="product-object">
            {category.label || ''}
          </div>
        </div>

        <b>{category.name}</b>

        <small>{category.description}</small>
      </Link>
    </div>
  )
}

export default CategoryCard