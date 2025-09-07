import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ 
  className, 
  type = "text",
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "w-full px-3 py-2 border-2 border-sage-100 rounded-lg focus:border-sage-400 focus:ring-0 transition-colors duration-200 placeholder:text-slate-500 bg-white",
        error && "border-coral-400 focus:border-coral-400",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input