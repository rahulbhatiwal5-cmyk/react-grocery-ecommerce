import { EmptyState, PageHeader } from './PageParts'

function Wishlist() {
  return <><PageHeader title="My wishlist" description="Keep products you love close at hand." /><section className="container py-4 py-md-5"><EmptyState title="Your wishlist is empty" text="Save products here to come back to them whenever you like." /></section></>
}

export default Wishlist
