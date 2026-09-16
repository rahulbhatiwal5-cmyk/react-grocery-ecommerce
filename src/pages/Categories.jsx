import { CategoryCard, PageHeader } from './PageParts'
import { categories } from '../data/catalog'

function Categories() {
  return (
    <>
      <PageHeader title="All categories" description="Find exactly what you are looking for, from fresh produce to household essentials." />
      <section className="container py-4 py-md-5"><div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">{categories.map((category) => <div className="col" key={category.slug}><CategoryCard category={category} /></div>)}</div></section>
    </>
  )
}

export default Categories
