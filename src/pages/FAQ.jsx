import { useState } from 'react'

const questions = [
  {
    answer: 'Eligible orders can be delivered in approximately 10–20 minutes.',
    question: 'How fast is delivery?',
  },
  {
    answer: 'Cancellation rules can be connected to your backend order status.',
    question: 'Can I cancel my order?',
  },
]

function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(0)

  const handleToggle = (index) => {
    setOpenQuestion((currentQuestion) => (
      currentQuestion === index ? null : index
    ))
  }

  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">HELP</div>

          <h1>Frequently Asked Questions</h1>
        </div>
      </div>

      <section className="container py-5" style={{ maxWidth: '850px' }}>
        <div className="accordion" id="faq">
          {questions.map(({ answer, question }, index) => {
            const isOpen = openQuestion === index
            const headingId = `faq-heading-${index}`
            const panelId = `faq-panel-${index}`

            return (
              <div className="accordion-item" key={question}>
                <h2 className="accordion-header" id={headingId}>
                  <button
                    aria-controls={panelId}
                    aria-expanded={isOpen}
                    className={`accordion-button${isOpen ? '' : ' collapsed'}`}
                    onClick={() => handleToggle(index)}
                    type="button"
                  >
                    {question}
                  </button>
                </h2>

                <div
                  aria-labelledby={headingId}
                  className={`accordion-collapse collapse${isOpen ? ' show' : ''}`}
                  id={panelId}
                >
                  <div className="accordion-body">{answer}</div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default FAQ
