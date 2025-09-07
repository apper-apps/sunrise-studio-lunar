import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No items found", 
  description = "There's nothing here yet", 
  actionLabel,
  onAction,
  icon = "Calendar",
  className = "" 
}) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-16 h-16 bg-gradient-to-br from-sage-100 to-peach-200 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name={icon} size={32} className="text-sage-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-ink-700 mb-2">{title}</h3>
      <p className="text-slate-500 mb-4 max-w-sm">{description}</p>
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-gradient-to-r from-sage-400 to-sage-400 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  )
}

export default Empty