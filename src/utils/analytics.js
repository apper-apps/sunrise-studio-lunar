export const trackEvent = (eventName, additionalData = {}) => {
  // Analytics tracking utility
  console.log("Analytics Event:", eventName, additionalData)
  
  // In a real app, you would send to your analytics service
  // gtag('event', eventName, additionalData)
  // or mixpanel.track(eventName, additionalData)
}