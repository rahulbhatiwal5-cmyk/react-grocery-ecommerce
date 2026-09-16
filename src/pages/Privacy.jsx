import { PageHeader } from './PageParts'

function Privacy() {
  return <><PageHeader title="Privacy policy" description="How GreenBasket handles your information." /><section className="container py-4 py-md-5" style={{ maxWidth: '900px' }}><article className="panel"><h2 className="h5 fw-bold">Information we collect</h2><p className="small text-muted mt-3">We collect the contact, delivery, and order information needed to process grocery purchases and provide support.</p><h2 className="h5 fw-bold mt-4">How we use information</h2><p className="small text-muted mt-3">Your details are used to deliver orders, communicate service updates, and improve your shopping experience.</p><h2 className="h5 fw-bold mt-4">Your choices</h2><p className="small text-muted mt-3 mb-0">You may contact us to ask about the personal information associated with your account.</p></article></section></>
}

export default Privacy
