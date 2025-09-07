import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import FormField from "@/components/molecules/FormField"
import Button from "@/components/atoms/Button"
import { validateForm } from "@/utils/validation"
import { signupService } from "@/services/api/signupService"
import { toast } from "react-toastify"

const MembershipModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    email: ""
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      await signupService.createMembership({
        ...formData,
        type: "membership"
      })
      
      toast.success("Thank you for your interest! We'll contact you soon to complete your membership.")
      
      setFormData({
        firstName: "",
        lastName: "",
        telephone: "",
        email: ""
      })
      setErrors({})
      onClose()
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-ink-700">Join Our Community</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-sage-100 rounded-lg transition-colors duration-200"
                  >
                    <ApperIcon name="X" size={20} className="text-slate-500" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="First Name"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      error={errors.firstName}
                      placeholder="First name"
                    />
                    
                    <FormField
                      label="Last Name"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      error={errors.lastName}
                      placeholder="Last name"
                    />
                  </div>

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

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting ? "Submitting..." : "Start My Membership"}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MembershipModal