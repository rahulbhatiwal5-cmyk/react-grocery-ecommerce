import HeroSection from '../components/home/HeroSection'
import TopCategories from '../components/home/TopCategories'
import DealsSection from '../components/home/DealsSection'
import BestSellers from '../components/home/BestSellers'
import BenefitsSection from '../components/home/BenefitsSection'

function Home() {
  return (
    <div className="container py-4 py-lg-5">

      <HeroSection />

      <TopCategories />

      <DealsSection />

      <BestSellers />

      <BenefitsSection />

    </div>
  )
}

export default Home