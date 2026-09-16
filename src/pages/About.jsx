function About() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">OUR STORY</div>

          <h1>Grocery shopping, made simple.</h1>
        </div>
      </div>

      <section className="container py-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="css-banner green">
              <div className="banner-copy">
                <h3>Farm fresh picks.</h3>

                <p>Quality checked before delivery.</p>
              </div>

              <div className="mini-basket" />
            </div>
          </div>

          <div className="col-lg-6">
            <h2 className="fw-bold">Freshness first. Convenience always.</h2>

            <p className="text-secondary mt-3">
              GreenBasket is an original grocery storefront concept focused on fast
              discovery, clear pricing and a simple shopping experience.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
