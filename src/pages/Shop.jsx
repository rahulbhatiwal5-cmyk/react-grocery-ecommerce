import { useSearchParams } from 'react-router-dom'
import { PageHeader, ProductCard } from './PageParts'
import { categories, products } from '../data/catalog'

function Shop() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('search')?.trim()
  const visibleProducts = query ? products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())) : products

  return (
    <>
      <PageHeader title="Shop groceries" description={query ? `Showing results for “${query}”` : 'Everything you need for a well-stocked kitchen.'} />
      <section className="container py-4 py-md-5">
        <div className="row g-4">
          <aside className="col-lg-3">
            <div className="filter-panel">
              <h2 className="h5 fw-bold">Filters</h2>
              <hr />
              <p className="small fw-bold mb-2">Categories</p>
              {categories.map((category) => <div className="form-check mb-2" key={category.slug}><input className="form-check-input" id={category.slug} type="checkbox" /><label className="form-check-label small" htmlFor={category.slug}>{category.name}</label></div>)}
              <hr />
              <p className="small fw-bold mb-2">Price range</p>
              <input className="form-range" type="range" min="0" max="500" aria-label="Maximum price" />
              <div className="d-flex justify-content-between small text-muted"><span>₹0</span><span>₹500+</span></div>
            </div>
          </aside>
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-3"><p className="small text-muted">{visibleProducts.length} products found</p><select className="form-select form-select-sm w-auto" aria-label="Sort products"><option>Sort: Popular</option><option>Price: Low to high</option><option>Price: High to low</option></select></div>
            {visibleProducts.length ? <div className="list-grid d-grid">{visibleProducts.map((product) => <ProductCard product={product} key={product.slug} />)}</div> : <div className="panel text-center py-5"><h2>No products found</h2><p className="text-muted">Try a different search term.</p></div>}
          </div>
        </div>
      </section>
    </>
  )
}

export default Shop
