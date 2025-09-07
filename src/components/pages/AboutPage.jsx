import { useState } from "react"
import { motion } from "framer-motion"
import StickyNavigation from "@/components/organisms/StickyNavigation"
import Footer from "@/components/organisms/Footer"
import FormField from "@/components/molecules/FormField"
import Button from "@/components/atoms/Button"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { validateForm } from "@/utils/validation"
import { contactService } from "@/services/api/contactService"
import { trackEvent } from "@/utils/analytics"
import { toast } from "react-toastify"

const AboutPage = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { ref: heroRef, hasIntersected: heroVisible } = useIntersectionObserver()
  const { ref: instructorRef, hasIntersected: instructorVisible } = useIntersectionObserver()
  const { ref: contactRef, hasIntersected: contactVisible } = useIntersectionObserver()

  const values = [
    {
      title: "Inclusivity",
      description: "Everyone belongs here, regardless of experience, body type, or background."
    },
    {
      title: "Mindfulness",
      description: "Present-moment awareness in movement, breath, and daily life."
    },
    {
      title: "Community",
      description: "Building genuine connections that support growth and healing."
    },
    {
      title: "Growth",
      description: "Continuous learning and evolution in body, mind, and spirit."
    }
  ]

  const instructors = [
    {
      name: "Maya Rodriguez",
      certifications: "RYT-500, Trauma-Informed Yoga",
      bio: "Maya founded Sunrise Studio with a vision of creating space for authentic connection and healing. She brings 15 years of practice and 8 years of teaching experience.",
      image: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-4.0.3&w=300&q=80"
    },
    {
      name: "James Chen",
      certifications: "RYT-200, Yin & Restorative Specialist",
      bio: "James specializes in slow, meditative practices that help students find stillness and inner peace. His classes are perfect for stress relief and deep relaxation.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=300&q=80"
    },
    {
      name: "Aisha Patel",
      certifications: "RYT-300, Prenatal & Family Yoga",
      bio: "Aisha creates welcoming spaces for families and expecting mothers. Her gentle approach makes yoga accessible to practitioners of all ages and stages of life.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&w=300&q=80"
    }
  ]

  const handleContactChange = (field, value) => {
    setContactForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    
    const validation = validateForm(contactForm, ["name", "email", "message"])
    
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsSubmitting(true)
    
    try {
      await contactService.submitMessage(contactForm)
      
      trackEvent("Contact_Submit", {
        name: contactForm.name
      })
      
      toast.success("Thank you for your message! We'll get back to you soon.")
      
      setContactForm({
        name: "",
        email: "",
        message: ""
      })
      setErrors({})
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <StickyNavigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-peach-50 via-white to-sage-100 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              ref={heroRef}
              className="text-center space-y-8"
              initial={{ opacity: 0, y: 50 }}
              animate={heroVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-ink-700">
                About <span className="bg-gradient-to-r from-sage-400 to-apricot-300 bg-clip-text text-transparent">
                  Sunrise Studio
                </span>
              </h1>
              
              <div className="max-w-3xl mx-auto space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Sunrise Yoga Studio was born from a simple belief: that yoga is for everyone, and that authentic community can transform lives. What started as a small gathering in Maya's living room has grown into a thriving sanctuary where people from all walks of life come together to practice, grow, and support each other.
                </p>
                
                <p>
                  Our studio isn't just about perfect poses or Instagram-worthy sequences. It's about showing up as you are, breathing together, and discovering the strength and peace that already exist within you. We believe in the power of mindful movement to heal, connect, and inspire.
                </p>
                
                <p>
                  Every sunrise brings new possibilities, and we're honored to be part of your journey toward wellness, self-discovery, and genuine connection. Whether you're stepping onto a mat for the first time or you've been practicing for years, you'll find your place in our community.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-ink-700 mb-4">Our Values</h2>
              <p className="text-lg text-slate-500">The principles that guide everything we do</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-sage-100 text-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold text-ink-700 mb-3">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Instructors Section */}
        <section className="py-16 bg-gradient-to-r from-sage-100/30 to-peach-50/30">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              ref={instructorRef}
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={instructorVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-bold text-ink-700 mb-4">Meet Our Teachers</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Our experienced instructors bring passion, knowledge, and genuine care to every class
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {instructors.map((instructor, index) => (
                <motion.div
                  key={instructor.name}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
                  initial={{ opacity: 0, y: 50 }}
                  animate={instructorVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
                >
                  <div className="text-center mb-4">
                    <img
                      src={instructor.image}
                      alt={`${instructor.name} - Yoga instructor at Sunrise Studio`}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-ink-700">{instructor.name}</h3>
                    <p className="text-sm text-sage-400 font-medium">{instructor.certifications}</p>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{instructor.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4">
            <motion.div
              ref={contactRef}
              initial={{ opacity: 0, y: 50 }}
              animate={contactVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-ink-700 mb-4">Get In Touch</h2>
                <p className="text-lg text-slate-500">
                  Have questions? We'd love to hear from you.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-sage-100">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      label="Name"
                      required
                      value={contactForm.name}
                      onChange={(e) => handleContactChange("name", e.target.value)}
                      error={errors.name}
                      placeholder="Your name"
                    />
                    
                    <FormField
                      label="Email"
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => handleContactChange("email", e.target.value)}
                      error={errors.email}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-1">
                      Message <span className="text-coral-400">*</span>
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => handleContactChange("message", e.target.value)}
                      className="w-full px-3 py-2 border-2 border-sage-100 rounded-lg focus:border-sage-400 focus:ring-0 transition-colors duration-200 placeholder:text-slate-500 bg-white min-h-[120px]"
                      placeholder="Tell us how we can help..."
                      rows={5}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-coral-400">{errors.message}</p>
                    )}
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full md:w-auto px-8"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default AboutPage