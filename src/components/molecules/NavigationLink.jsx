import { Link } from "react-router-dom"
import { cn } from "@/utils/cn"
import { trackEvent } from "@/utils/analytics"

const NavigationLink = ({ 
  to, 
  children, 
  onClick,
  className = "",
  variant = "default"
}) => {
  const handleClick = () => {
    trackEvent("Nav_Link_Click", { destination: to })
    if (onClick) onClick()
  }

  const baseStyles = "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2 rounded"
  
  const variants = {
    default: "text-ink-700 hover:text-sage-400",
    button: "px-4 py-2 bg-gradient-to-r from-sage-400 to-sage-400 text-white rounded-lg hover:shadow-lg hover:scale-105"
  }

  if (to.startsWith("#")) {
    return (
      <button
        onClick={(e) => {
          e.preventDefault()
          handleClick()
          document.querySelector(to)?.scrollIntoView({ 
            behavior: "smooth",
            block: "start"
          })
        }}
        className={cn(baseStyles, variants[variant], className)}
      >
        {children}
      </button>
    )
  }

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={cn(baseStyles, variants[variant], className)}
    >
      {children}
    </Link>
  )
}

export default NavigationLink