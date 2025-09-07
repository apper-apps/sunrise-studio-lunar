import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"
import { trackEvent } from "@/utils/analytics"

const SplitButton = ({ 
  primaryLabel, 
  onPrimaryClick, 
  onSecondaryClick,
  isSecondaryActive = false,
  className = ""
}) => {
  const handlePrimaryClick = () => {
    trackEvent("Header_Signup_Click")
    onPrimaryClick?.()
  }

  const handleSecondaryClick = () => {
    trackEvent("SchedulePanel_Toggle")
    onSecondaryClick?.()
  }

  return (
    <div className={cn("flex bg-gradient-to-r from-sage-400 to-sage-400 rounded-lg shadow-lg overflow-hidden", className)}>
      <button
        onClick={handlePrimaryClick}
        className="px-6 py-3 text-white font-medium hover:bg-sage-400/90 transition-colors duration-200 flex-1 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2"
      >
        {primaryLabel}
      </button>
      
      <button
        onClick={handleSecondaryClick}
        className={cn(
          "px-4 py-3 border-l border-white/20 hover:bg-sage-400/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2",
          isSecondaryActive && "bg-sage-400/90"
        )}
      >
        <ApperIcon 
          name={isSecondaryActive ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-white transition-transform duration-200" 
        />
      </button>
    </div>
  )
}

export default SplitButton