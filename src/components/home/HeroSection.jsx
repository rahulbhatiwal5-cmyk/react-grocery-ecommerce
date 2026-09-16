import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <section className="hero row g-0 align-items-center">

      <div className="col-lg-7 hero-copy">

        <div className="eyebrow">
          DAILY NEEDS FOCUSED
        </div>

        <h1>
          Your daily needs,
          <br />

          <span className="text-success">
            delivered fast.
          </span>
        </h1>

        <p className="fs-5 mt-3">
          Everything you need, right when you need it.
          Fresh groceries and essentials without the wait.
        </p>

        <div className="d-flex gap-2 mt-4">

          <Link
            to="/shop"
            className="btn btn-success px-4"
          >
            Shop Now
          </Link>

          <Link
            to="/offers"
            className="btn btn-outline-success px-4"
          >
            View Deals
          </Link>

        </div>

      </div>

      <div className="col-lg-5">

        <div className="css-banner green hero-image">

          <div className="banner-copy">

            <div className="eyebrow">
              FRESH EVERY DAY
            </div>

            <h3>Fresh groceries.</h3>

            <p>
              Delivered fast. Every day.
            </p>

          </div>

          <div className="mini-basket"></div>

        </div>

      </div>

    </section>
  )
}

export default HeroSection