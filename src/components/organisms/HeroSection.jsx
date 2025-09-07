import { useState } from "react"
import { motion } from "framer-motion"
import SplitButton from "@/components/molecules/SplitButton"
import SchedulePanel from "@/components/organisms/SchedulePanel"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

const HeroSection = () => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)
  const { ref, hasIntersected } = useIntersectionObserver()

  const scrollToSignup = () => {
    document.querySelector("#signup")?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    })
  }

  const toggleSchedule = () => {
    setIsScheduleOpen(!isScheduleOpen)
  }

  return (
    <section id="hero" className="relative min-h-screen bg-gradient-to-br from-peach-50 via-white to-sage-100 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-10rem)]">
          {/* Content */}
          <motion.div
            ref={ref}
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-ink-700">Hi — </span>
              <span className="bg-gradient-to-r from-coral-400 to-apricot-300 bg-clip-text text-transparent">
                Awaken Your Body,
              </span>
              <br />
              <span className="text-ink-700">Calm Your Mind,</span>
              <br />
              <span className="text-ink-700">Embrace the Sunrise</span>
            </h1>

            <p className="text-xl text-slate-500 max-w-lg leading-relaxed">
              Join our welcoming community and start your journey to strength, peace, and wellness.
            </p>

            <SplitButton
              primaryLabel="Sign Up"
              onPrimaryClick={scrollToSignup}
              onSecondaryClick={toggleSchedule}
              isSecondaryActive={isScheduleOpen}
              className="w-full sm:w-auto"
            />

            {/* Schedule Panel */}
            <SchedulePanel isOpen={isScheduleOpen} />
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <div className="absolute inset-0 bg-gradient-to-br from-sage-400/20 to-coral-400/20 z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Sunrise yoga studio with natural light, wooden floors, and welcoming community atmosphere"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-sage-400 to-apricot-300 rounded-full blur-xl opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-coral-400 to-peach-200 rounded-full blur-xl opacity-40"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection