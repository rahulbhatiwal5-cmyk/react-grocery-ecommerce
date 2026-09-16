import { Link } from 'react-router-dom'

import deals from '../../data/deals'
import DealCard from './DealCard'

function DealsSection() {
  return (
    <section className="mt-5">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="section-title h4 mb-0">
          Deals You'll Love
        </h2>

        <Link className="link-green" to="/offers">
          View all →
        </Link>
      </div>

      <div className="row g-3">

        {deals.map((deal) => (
          <DealCard
            key={deal.id}
            deal={deal}
          />
        ))}

      </div>

    </section>
  )
}

export default DealsSection