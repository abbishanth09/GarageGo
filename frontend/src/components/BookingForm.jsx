import { useState, useEffect } from 'react'
import { vehicleAPI, serviceAPI, bookingAPI } from '../services/apiService'
import { TIME_SLOTS } from '../utils/constants'
import { formatTime } from '../utils/helpers'

const BookingForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    vehicle: '',
    service: '',
    booking_date: '',
    time_slot: '',
    notes: '',
  })
  const [vehicles, setVehicles] = useState([])
  const [services, setServices] = useState([])
  const [availableSlots, setAvailableSlots] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingSlots, setLoadingSlots] = useState(false)

  useEffect(() => {
    fetchVehicles()
    fetchServices()
  }, [])

  useEffect(() => {
    if (formData.booking_date) {
      fetchAvailableSlots()
    }
  }, [formData.booking_date])

  const fetchVehicles = async () => {
    try {
      const response = await vehicleAPI.getAll()
      setVehicles(response.data)
    } catch (err) {
      console.error('Failed to load vehicles')
    }
  }

  const fetchServices = async () => {
    try {
      const response = await serviceAPI.getAll()
      setServices(response.data.filter(s => s.is_active))
    } catch (err) {
      console.error('Failed to load services')
    }
  }

  const fetchAvailableSlots = async () => {
    setLoadingSlots(true)
    try {
      const response = await bookingAPI.getAvailableSlots(formData.booking_date)
      setAvailableSlots(response.data.available_slots)
    } catch (err) {
      console.error('Failed to load time slots')
      setAvailableSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await bookingAPI.create(formData)
      setFormData({
        vehicle: '',
        service: '',
        booking_date: '',
        time_slot: '',
        notes: '',
      })
      onSuccess()
    } catch (err) {
      const errorData = err.response?.data
      if (errorData) {
        const errorMessage = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join('\n')
        setError(errorMessage)
      } else {
        setError('Failed to create booking')
      }
    } finally {
      setLoading(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Create Booking</h4>
        
        {error && (
          <div className="alert alert-danger" style={{ whiteSpace: 'pre-line' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Select Vehicle *</label>
            <select
              className="form-select"
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Vehicle --</option>
              {vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.vehicle_number} - {vehicle.make} {vehicle.model}
                </option>
              ))}
            </select>
            {vehicles.length === 0 && (
              <small className="text-muted">Please add a vehicle first</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Select Service *</label>
            <select
              className="form-select"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Service --</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} - ${service.price} ({service.duration_minutes} min)
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Booking Date *</label>
            <input
              type="date"
              className="form-control"
              name="booking_date"
              value={formData.booking_date}
              onChange={handleChange}
              min={today}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Time Slot *</label>
            {loadingSlots ? (
              <p className="text-muted">Loading available slots...</p>
            ) : formData.booking_date ? (
              availableSlots.length > 0 ? (
                <select
                  className="form-select"
                  name="time_slot"
                  value={formData.time_slot}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Time Slot --</option>
                  {availableSlots.map(slot => (
                    <option key={slot} value={slot}>
                      {formatTime(slot)}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-danger">No available slots for this date</p>
              )
            ) : (
              <p className="text-muted">Please select a date first</p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Notes</label>
            <textarea
              className="form-control"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading || vehicles.length === 0}>
            {loading ? 'Creating...' : 'Create Booking'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookingForm
