import { useState } from "react"
import { motion } from "framer-motion"
import FormField from "@/components/molecules/FormField"
import Button from "@/components/atoms/Button"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { validateForm } from "@/utils/validation"
import { signupService } from "@/services/api/signupService"
import { trackEvent } from "@/utils/analytics"
import { toast } from "react-toastify"

const OfferSignupSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    email: ""
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { ref, hasIntersected } = useIntersectionObserver()

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validation = validateForm(formData, ["firstName", "lastName", "telephone", "email"])
    
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsSubmitting(true)
    
    try {
      await signupService.createFreeTrial({
        ...formData,
        type: "free-trial"
      })
      
      trackEvent("FreeTrial_Signup", {
        firstName: formData.firstName,
        lastName: formData.lastName
      })
      
      toast.success("Welcome to Sunrise Studio! We'll be in touch soon to schedule your first class.")
      
      setFormData({
        firstName: "",
        lastName: "",
        telephone: "",
        email: ""
      })
      setErrors({})
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-gradient-to-r from-peach-50 to-sage-100 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          ref={ref}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/50"
          initial={{ opacity: 0, y: 50 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-ink-700 mb-4">
              <span className="bg-gradient-to-r from-sage-400 to-apricot-300 bg-clip-text text-transparent">
                Sharing is Caring
              </span>
              {" "}— Your First 2 Weeks Are Free!
            </h2>
            
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Enjoy full access to morning, midday, and afternoon classes, plus our Saturday Community Gathering (10 AM–12 PM). We can't wait to welcome you with open arms.
            </p>
          </div>

          <form onSubmit={handleSubmit} id="signup" className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <FormField
                label="First Name"
                required
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                error={errors.firstName}
                placeholder="Enter your first name"
              />
              
              <FormField
                label="Last Name"
                required
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                error={errors.lastName}
                placeholder="Enter your last name"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <FormField
                label="Phone Number"
                type="tel"
                required
                value={formData.telephone}
                onChange={(e) => handleInputChange("telephone", e.target.value)}
                error={errors.telephone}
                placeholder="(555) 123-4567"
              />
              
              <FormField
                label="Email Address"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={errors.email}
                placeholder="you@email.com"
              />
            </div>

            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 text-lg"
              >
                {isSubmitting ? "Getting You Started..." : "Start My Free 2 Weeks"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default OfferSignupSection