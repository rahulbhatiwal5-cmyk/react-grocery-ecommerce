import { Link, useParams } from 'react-router-dom'
import { PageHeader, ProductCard } from './PageParts'
import { categories, products } from '../data/catalog'

function Category() {
  const { categorySlug } = useParams()
  const category = categories.find((item) => item.slug === categorySlug)
  const title = category?.name || 'Category'
  return (
    <>
      <PageHeader title={title} description={category ? `Explore ${category.count} hand-picked ${title.toLowerCase()} items.` : 'Discover fresh grocery essentials.'} />
      <section className="container py-4 py-md-5">
        <Link className="link-green d-inline-block mb-3" to="/categories">← All categories</Link>
        <div className="list-grid d-grid">{products.slice(0, 6).map((product) => <ProductCard product={product} key={product.slug} />)}</div>
      </section>
    </>
  )
}

export default Category
