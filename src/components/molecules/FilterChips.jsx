import { cn } from "@/utils/cn"
import { trackEvent } from "@/utils/analytics"

const FilterChips = ({ 
  options = [], 
  selected, 
  onSelect,
  className = ""
}) => {
  const handleSelect = (option) => {
    trackEvent("Schedule_Filter_Select", { filter: option })
    onSelect?.(option)
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleSelect(option)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2",
            selected === option 
              ? "bg-gradient-to-r from-sage-400 to-sage-400 text-white shadow-md"
              : "bg-sage-100 text-sage-400 hover:bg-sage-200 hover:scale-105"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default FilterChips