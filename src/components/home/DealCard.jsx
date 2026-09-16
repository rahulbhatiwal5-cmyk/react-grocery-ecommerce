import { Link } from 'react-router-dom'

function DealCard({ deal }) {
  return (
    <div className="col-md-4">
      <div className="promo">

        <div className={`css-banner ${deal.bannerClass}`}>
          <div className="banner-copy">
            <h3>{deal.title}</h3>
            <p>{deal.description}</p>
          </div>

          <div className="mini-basket"></div>
        </div>

        <div className="promo-body">
          <div className="eyebrow">
            {deal.eyebrow}
          </div>

          <h3 className="h5 fw-bold">
            {deal.heading}
          </h3>

          <Link
            className="btn btn-success btn-sm"
            to={deal.link}
          >
            {deal.buttonText}
          </Link>
        </div>

      </div>
    </div>
  )
}

export default DealCard