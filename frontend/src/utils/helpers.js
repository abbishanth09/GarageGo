export const getStatusBadgeClass = (status) => {
  const statusClasses = {
    pending: 'bg-warning',
    approved: 'bg-info',
    in_progress: 'bg-primary',
    completed: 'bg-success',
    cancelled: 'bg-danger',
  }
  return statusClasses[status] || 'bg-secondary'
}

export const getPaymentBadgeClass = (paymentStatus) => {
  return paymentStatus === 'paid' ? 'bg-success' : 'bg-danger'
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

export const formatTime = (timeString) => {
  if (!timeString) return ''
  const [hours, minutes] = timeString.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
