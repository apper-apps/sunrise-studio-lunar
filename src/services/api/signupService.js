import signupData from "@/services/mockData/signups.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage for new signups (in a real app, this would be a database)
let signups = [...signupData]

const getNextId = () => {
  const maxId = signups.reduce((max, signup) => Math.max(max, signup.Id), 0)
  return maxId + 1
}

export const signupService = {
  async createFreeTrial(signupInfo) {
    await delay(400) // Simulate network delay
    
    try {
      const newSignup = {
        Id: getNextId(),
        ...signupInfo,
        type: "free-trial",
        createdAt: new Date().toISOString(),
        status: "pending"
      }
      
      signups.push(newSignup)
      
      return { ...newSignup }
    } catch (error) {
      console.error("Signup service error:", error)
      throw new Error("Failed to process signup")
    }
  },

  async createMembership(signupInfo) {
    await delay(400)
    
    try {
      const newSignup = {
        Id: getNextId(),
        ...signupInfo,
        type: "membership",
        createdAt: new Date().toISOString(),
        status: "pending"
      }
      
      signups.push(newSignup)
      
      return { ...newSignup }
    } catch (error) {
      console.error("Signup service error:", error)
      throw new Error("Failed to process membership signup")
    }
  },

  async getAllSignups() {
    await delay(300)
    
    try {
      return [...signups].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } catch (error) {
      console.error("Signup service error:", error)
      throw new Error("Failed to load signups")
    }
  },

  async getSignupById(id) {
    await delay(200)
    
    const signup = signups.find(signup => signup.Id === parseInt(id))
    if (!signup) {
      throw new Error("Signup not found")
    }
    
    return { ...signup }
  }
}