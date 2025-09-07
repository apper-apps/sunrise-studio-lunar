import calendarData from "@/services/mockData/calendarEvents.json"

// Simulated Google Calendar API integration
const GOOGLE_CALENDAR_ID = "you@yourdomain.com" // Placeholder
const GOOGLE_API_KEY = "PUBLIC_BROWSER_API_KEY" // Placeholder

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const categorizeEvent = (title) => {
  const titleLower = title.toLowerCase()
  if (titleLower.includes("[class]") || titleLower.includes("yoga") || titleLower.includes("flow")) {
    return "classes"
  }
  if (titleLower.includes("[event]") || titleLower.includes("workshop")) {
    return "events"
  }
  if (titleLower.includes("[community]") || titleLower.includes("gathering")) {
    return "community"
  }
  if (titleLower.includes("[course]") || titleLower.includes("certification")) {
    return "courses"
  }
  return "classes"
}

export const calendarService = {
  async getEventsByMonth(month) {
    await delay(300) // Simulate network delay
    
    try {
      // In a real app, this would call the Google Calendar API
      // const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CALENDAR_ID}/events?key=${GOOGLE_API_KEY}&timeMin=${startOfMonth}&timeMax=${endOfMonth}`)
      
      // For now, filter mock data by month
      const monthYear = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`
      
      const events = calendarData
        .filter(event => event.date.startsWith(monthYear))
        .map(event => ({
          ...event,
          category: categorizeEvent(event.title),
          htmlLink: `https://calendar.google.com/calendar/event?eid=${event.Id}`
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
      
      return events
    } catch (error) {
      console.error("Calendar service error:", error)
      throw new Error("Failed to load calendar events")
    }
  },

  async getEventById(id) {
    await delay(200)
    
    const event = calendarData.find(event => event.Id === parseInt(id))
    if (!event) {
      throw new Error("Event not found")
    }
    
    return {
      ...event,
      category: categorizeEvent(event.title),
      htmlLink: `https://calendar.google.com/calendar/event?eid=${event.Id}`
    }
  }
}