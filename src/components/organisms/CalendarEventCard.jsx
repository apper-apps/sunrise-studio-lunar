import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { trackEvent } from "@/utils/analytics"
import { format } from "date-fns"

const CalendarEventCard = ({ event }) => {
  const handleRSVP = () => {
    trackEvent("Schedule_RSVP_Click", { eventId: event.id, eventTitle: event.title })
    document.querySelector("#signup")?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    })
  }

  const handleAddToCalendar = () => {
    if (event.htmlLink) {
      window.open(event.htmlLink, "_blank")
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      classes: "from-sage-400 to-sage-400",
      events: "from-apricot-300 to-coral-400",
      community: "from-coral-400 to-apricot-300",
      courses: "from-sage-100 to-peach-200"
    }
    return colors[category.toLowerCase()] || "from-slate-400 to-slate-400"
  }

  return (
    <div className="bg-white rounded-lg border border-sage-100 p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getCategoryColor(event.category)}`}></div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              {event.category}
            </span>
          </div>
          
          <h4 className="font-semibold text-ink-700 mb-1">{event.title}</h4>
          
          <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
            <div className="flex items-center space-x-1">
              <ApperIcon name="Calendar" size={14} />
              <span>{format(new Date(event.date), "MMM d")}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Clock" size={14} />
              <span>{event.time}</span>
            </div>
            {event.location && (
              <div className="flex items-center space-x-1">
                <ApperIcon name="MapPin" size={14} />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-sage-100">
        <div className="flex space-x-2">
          <Button
            onClick={handleRSVP}
            size="sm"
            className="text-sm"
          >
            Join / RSVP
          </Button>
          
          {event.htmlLink && (
            <Button
              onClick={handleAddToCalendar}
              variant="outline"
              size="sm"
              className="text-sm"
            >
              Add to Calendar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CalendarEventCard