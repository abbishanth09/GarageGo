import api from '../utils/api'

export const authAPI = {
  register: (data) => api.post('/auth/register/', data),
  login: (data) => api.post('/auth/login/', data),
  getProfile: () => api.get('/auth/profile/'),
  getMechanics: () => api.get('/auth/mechanics/'),
}

export const userAPI = {
  getUsersByRole: (role) => api.get(`/users/${role}/`),
  toggleUserActive: (userId) => api.patch(`/users/${userId}/toggle-active/`),
  deleteUser: (userId) => api.delete(`/users/${userId}/delete/`),
}

export const vehicleAPI = {
  getAll: () => api.get('/vehicles/'),
  getOne: (id) => api.get(`/vehicles/${id}/`),
  create: (data) => api.post('/vehicles/', data),
  update: (id, data) => api.patch(`/vehicles/${id}/`, data),
  delete: (id) => api.delete(`/vehicles/${id}/`),
}

export const serviceAPI = {
  getAll: () => api.get('/services/'),
  getOne: (id) => api.get(`/services/${id}/`),
  create: (data) => api.post('/services/', data),
  update: (id, data) => api.patch(`/services/${id}/`, data),
  delete: (id) => api.delete(`/services/${id}/`),
}

export const bookingAPI = {
  getAll: (params) => api.get('/bookings/', { params }),
  getOne: (id) => api.get(`/bookings/${id}/`),
  create: (data) => api.post('/bookings/', data),
  update: (id, data) => api.patch(`/bookings/${id}/`, data),
  delete: (id) => api.delete(`/bookings/${id}/`),
  approve: (id, data) => api.post(`/bookings/${id}/approve/`, data),
  updateStatus: (id, data) => api.post(`/bookings/${id}/status/`, data),
  updatePayment: (id, data) => api.post(`/bookings/${id}/payment/`, data),
  assignMechanic: (id, data) => api.post(`/bookings/${id}/assign-mechanic/`, data),
  getMechanicBookings: () => api.get('/bookings/mechanic/my-bookings/'),
  getAvailableSlots: (date) => api.get('/bookings/available-slots/', { params: { date } }),
}
