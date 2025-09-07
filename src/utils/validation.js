export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone) => {
const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
const cleanPhone = phone.replace(/[\s\-()]/g, "")
  return phoneRegex.test(cleanPhone)
}

export const validateRequired = (value) => {
  return value && value.trim().length > 0
}

export const validateForm = (formData, requiredFields) => {
  const errors = {}
  
  requiredFields.forEach(field => {
    if (!validateRequired(formData[field])) {
      errors[field] = "This field is required"
    }
  })
  
  if (formData.email && !validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address"
  }
  
  if (formData.telephone && !validatePhone(formData.telephone)) {
    errors.telephone = "Please enter a valid phone number"
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}