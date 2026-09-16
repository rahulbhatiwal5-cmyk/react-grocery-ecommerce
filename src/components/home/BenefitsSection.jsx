function BenefitsSection() {
  const benefits = [
    {
      id: 1,
      icon: '10',
      title: '10 mins delivery',
      text: 'In supported areas',
    },
    {
      id: 2,
      icon: '✓',
      title: 'No minimum order',
      text: 'Shop what you need',
    },
    {
      id: 3,
      icon: '♧',
      title: 'Fresh quality',
      text: 'Quality checked',
    },
    {
      id: 4,
      icon: '₹',
      title: 'Best prices',
      text: 'Daily value deals',
    },
  ]

  return (
    <section className="benefits mt-5">
      <div className="row g-3">

        {benefits.map((benefit) => (
          <div
            className="col-6 col-lg-3"
            key={benefit.id}
          >
            <div className="benefit">

              <div className="benefit-icon">
                {benefit.icon}
              </div>

              <div>
                <b>{benefit.title}</b>
                <small>{benefit.text}</small>
              </div>

            </div>
          </div>
        ))}

      </div>
    </section>
  )
}

export default BenefitsSection