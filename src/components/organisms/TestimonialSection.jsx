import { motion } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

const TestimonialSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver()

  const testimonials = [
    {
      id: 1,
      quote: "The community at Sunrise Studio welcomed me with open arms from day one. It's become my sanctuary.",
      author: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=150&q=80"
    },
    {
      id: 2,
      quote: "More than just yoga classes—this is where I found my tribe and learned to embrace mindful living.",
      author: "Marcus Thompson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-sage-100/30 to-peach-50/30">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
              initial={{ opacity: 0, y: 50 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
            >
              <blockquote className="text-lg text-slate-600 mb-4 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={`${testimonial.author} - Sunrise Studio community member`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <cite className="font-medium text-ink-700 not-italic">
                    {testimonial.author}
                  </cite>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialSection