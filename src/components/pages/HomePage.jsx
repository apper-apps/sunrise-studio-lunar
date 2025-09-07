import StickyNavigation from "@/components/organisms/StickyNavigation"
import HeroSection from "@/components/organisms/HeroSection"
import OfferSignupSection from "@/components/organisms/OfferSignupSection"
import CommunityMembershipSection from "@/components/organisms/CommunityMembershipSection"
import TestimonialSection from "@/components/organisms/TestimonialSection"
import Footer from "@/components/organisms/Footer"

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <StickyNavigation />
      
      <main>
        <HeroSection />
        <OfferSignupSection />
        <div id="community">
          <CommunityMembershipSection />
        </div>
        <div id="classes">
          <TestimonialSection />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default HomePage