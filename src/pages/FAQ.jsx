import { PageHeader } from './PageParts'

const questions = [
  ['When will my order arrive?', 'You can select an available delivery slot during checkout.'],
  ['What happens if an item is unavailable?', 'We will let you know before delivery and will not charge you for unavailable items.'],
  ['Can I change my order?', 'You can contact support before your order is packed and we will do our best to help.'],
  ['Is there a delivery fee?', 'Delivery is free for orders above ₹499. Smaller orders have a ₹40 delivery fee.'],
]

function FAQ() {
  return <><PageHeader title="Frequently asked questions" description="Quick answers about shopping and delivery." /><section className="container py-4 py-md-5" style={{ maxWidth: '900px' }}><div className="accordion" id="faqList">{questions.map(([question, answer], index) => <div className="accordion-item" key={question}><h2 className="accordion-header"><button className={`accordion-button ${index ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#faq-${index}`} aria-expanded={index === 0} aria-controls={`faq-${index}`}>{question}</button></h2><div id={`faq-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#faqList"><div className="accordion-body small text-muted">{answer}</div></div></div>)}</div></section></>
}

export default FAQ
