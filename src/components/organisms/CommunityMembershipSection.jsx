import { useState } from "react"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import MembershipModal from "@/components/organisms/MembershipModal"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { trackEvent } from "@/utils/analytics"

const CommunityMembershipSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { ref, hasIntersected } = useIntersectionObserver()

  const handleMembershipClick = () => {
    trackEvent("Membership_Signup_Click")
    setIsModalOpen(true)
  }

  const handleLearnMore = () => {
    window.location.href = "/about"
  }

  const membershipBenefits = [
    "Full access to classes/events/gatherings",
    "10% off studio shop",
    "20% off certification courses"
  ]

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Community Content */}
          <div className="space-y-6">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide">
              A Community That Grows Together
            </h2>
            
            <div className="space-y-4">
              <p className="text-lg text-slate-600 leading-relaxed">
                Yoga isn't just about the poses—it's about connection, friendship, and shared growth. Our community comes together not just to practice, but to support each other through life's journey.
              </p>
              
              <p className="text-lg text-slate-600 leading-relaxed">
                Join us for your first Community Gathering absolutely free and experience the warmth and support that makes Sunrise Studio special.
              </p>
            </div>
          </div>

          {/* Membership Card */}
          <motion.div
            className="bg-gradient-to-br from-white to-sage-50 rounded-2xl shadow-lg p-8 border border-sage-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={hasIntersected ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-baseline space-x-1 mb-2">
                <span className="text-4xl font-bold bg-gradient-to-r from-sage-400 to-apricot-300 bg-clip-text text-transparent">
                  $99
                </span>
                <span className="text-lg text-slate-500">/month</span>
              </div>
              <h3 className="text-xl font-semibold text-ink-700">Community Member</h3>
            </div>

            <div className="space-y-3 mb-8">
              {membershipBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-sage-400 to-apricot-300 rounded-full flex-shrink-0"></div>
                  <span className="text-slate-600">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleMembershipClick}
                className="w-full"
                size="lg"
              >
                Become a Member
              </Button>
              
              <Button
                onClick={handleLearnMore}
                variant="outline"
                className="w-full"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <MembershipModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}

export default CommunityMembershipSection