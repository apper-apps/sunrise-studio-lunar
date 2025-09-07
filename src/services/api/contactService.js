import contactData from "@/services/mockData/contacts.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage for new contacts (in a real app, this would be a database)
let contacts = [...contactData]

const getNextId = () => {
  const maxId = contacts.reduce((max, contact) => Math.max(max, contact.Id), 0)
  return maxId + 1
}

export const contactService = {
  async submitMessage(contactInfo) {
    await delay(400) // Simulate network delay
    
    try {
      const newContact = {
        Id: getNextId(),
        ...contactInfo,
        createdAt: new Date().toISOString(),
        status: "unread"
      }
      
      contacts.push(newContact)
      
      return { ...newContact }
    } catch (error) {
      console.error("Contact service error:", error)
      throw new Error("Failed to submit message")
    }
  },

  async getAllMessages() {
    await delay(300)
    
    try {
      return [...contacts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } catch (error) {
      console.error("Contact service error:", error)
      throw new Error("Failed to load messages")
    }
  },

  async getMessageById(id) {
    await delay(200)
    
    const contact = contacts.find(contact => contact.Id === parseInt(id))
    if (!contact) {
      throw new Error("Message not found")
    }
    
    return { ...contact }
  },

  async markAsRead(id) {
    await delay(200)
    
    const contact = contacts.find(contact => contact.Id === parseInt(id))
    if (!contact) {
      throw new Error("Message not found")
    }
    
    contact.status = "read"
    return { ...contact }
  }
}