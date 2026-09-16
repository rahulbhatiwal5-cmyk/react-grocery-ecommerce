import categories from '../data/categories'
import CategoryCard from '../components/category/CategoryCard'

function Categories() {
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