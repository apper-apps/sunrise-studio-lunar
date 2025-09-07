import NavigationLink from "@/components/molecules/NavigationLink"
import ApperIcon from "@/components/ApperIcon"

const Footer = () => {
  const socialLinks = [
    { name: "Instagram", icon: "Instagram", url: "https://instagram.com" },
    { name: "Facebook", icon: "Facebook", url: "https://facebook.com" },
    { name: "Twitter", icon: "Twitter", url: "https://twitter.com" }
  ]

  return (
    <footer className="bg-ink-700 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-sage-400 to-apricot-300 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold">Sunrise Studio</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Awaken your body, calm your mind, and embrace the sunrise with our welcoming yoga community.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <NavigationLink to="#hero" className="text-slate-400 hover:text-white">
                Home
              </NavigationLink>
              <NavigationLink to="#classes" className="text-slate-400 hover:text-white">
                Classes
              </NavigationLink>
              <NavigationLink to="#community" className="text-slate-400 hover:text-white">
                Community
              </NavigationLink>
              <NavigationLink to="/about" className="text-slate-400 hover:text-white">
                About
              </NavigationLink>
              <NavigationLink to="#signup" className="text-slate-400 hover:text-white">
                Sign Up
              </NavigationLink>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Connect With Us</h3>
            <div className="space-y-2 text-slate-400">
              <p>123 Sunrise Ave, Wellness District</p>
              <p>hello@sunrisestudio.com</p>
              <p>(555) 123-YOGA</p>
            </div>
            
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-sage-400 transition-colors duration-200"
                  aria-label={`Visit our ${social.name} page`}
                >
                  <ApperIcon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-600 text-center text-slate-400">
          <p>&copy; 2024 Sunrise Yoga Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer