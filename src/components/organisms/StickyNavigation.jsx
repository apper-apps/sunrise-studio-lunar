import { motion } from "framer-motion"
import NavigationLink from "@/components/molecules/NavigationLink"
import { useScrollPosition } from "@/hooks/useScrollPosition"

const StickyNavigation = () => {
  const { isScrolled } = useScrollPosition()

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 transition-all duration-300"
      initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
      animate={{
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0)",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        boxShadow: isScrolled ? "0 2px 20px rgba(143, 200, 167, 0.1)" : "none"
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavigationLink to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-sage-400 to-apricot-300 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-ink-700">Sunrise Studio</span>
          </NavigationLink>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationLink to="#hero">Home</NavigationLink>
            <NavigationLink to="#classes">Classes</NavigationLink>
            <NavigationLink to="#community">Community</NavigationLink>
            <NavigationLink to="/about">About</NavigationLink>
            <NavigationLink 
              to="#signup" 
              variant="button"
            >
              Sign Up
            </NavigationLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <NavigationLink 
              to="#signup" 
              variant="button"
              className="text-sm px-3 py-2"
            >
              Sign Up
            </NavigationLink>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default StickyNavigation