import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import FilterChips from "@/components/molecules/FilterChips"
import CalendarEventCard from "@/components/organisms/CalendarEventCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { calendarService } from "@/services/api/calendarService"
import { trackEvent } from "@/utils/analytics"
import { format } from "date-fns"

const SchedulePanel = ({ isOpen }) => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [selectedFilter, setSelectedFilter] = useState("All")

  const filters = ["All", "Classes", "Events", "Community", "Courses"]

  useEffect(() => {
    if (isOpen) {
      loadEvents()
    }
  }, [isOpen, selectedMonth])

  const loadEvents = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await calendarService.getEventsByMonth(selectedMonth)
      setEvents(data)
    } catch (err) {
      setError("Unable to load schedule. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const navigateMonth = (direction) => {
    const newMonth = new Date(selectedMonth)
    newMonth.setMonth(newMonth.getMonth() + direction)
    setSelectedMonth(newMonth)
    trackEvent("Schedule_Month_Change", { 
      direction: direction > 0 ? "next" : "previous",
      month: format(newMonth, "MMMM yyyy")
    })
  }

  const filteredEvents = events.filter(event => {
    if (selectedFilter === "All") return true
    return event.category.toLowerCase() === selectedFilter.toLowerCase()
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-sage-100 overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="p-6 space-y-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-sage-100 rounded-lg transition-colors duration-200"
              >
                <ApperIcon name="ChevronLeft" size={20} className="text-sage-400" />
              </button>
              
              <h3 className="text-lg font-semibold text-ink-700">
                {format(selectedMonth, "MMMM yyyy")}
              </h3>
              
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-sage-100 rounded-lg transition-colors duration-200"
              >
                <ApperIcon name="ChevronRight" size={20} className="text-sage-400" />
              </button>
            </div>

            {/* Filters */}
            <FilterChips
              options={filters}
              selected={selectedFilter}
              onSelect={setSelectedFilter}
            />

            {/* Events List */}
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <Loading />
              ) : error ? (
                <Error message={error} onRetry={loadEvents} />
              ) : filteredEvents.length === 0 ? (
                <Empty 
                  title="No events found"
                  description="No events match your current filter selection."
                  icon="Calendar"
                />
              ) : (
                <div className="space-y-3">
                  {filteredEvents.map((event) => (
                    <CalendarEventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </div>

            {/* Fallback Calendar Embed */}
            {!loading && !error && (
              <div className="mt-4 p-4 bg-sage-50 rounded-lg">
                <div className="aspect-video bg-white rounded-lg shadow-inner flex items-center justify-center">
                  <div className="text-center">
                    <ApperIcon name="Calendar" size={48} className="text-sage-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">
                      Full calendar view coming soon
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SchedulePanel