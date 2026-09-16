import DealCard from '../components/home/DealCard'
import deals from '../data/deals'

function Offers() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">Deals</div>
          <h1>Today's Offers</h1>
          <p className="text-secondary mb-0">
            Simple savings on everyday groceries.
          </p>
        </div>
      </div>

      <section className="container py-4">
        <div className="row g-3">
          {deals.map((deal) => <DealCard key={deal.id} deal={deal} />)}
        </div>
      </section>
    </>
  )
}

export default Offers
