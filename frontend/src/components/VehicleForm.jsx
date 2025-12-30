import { useState } from 'react'
import { vehicleAPI } from '../services/apiService'

const VehicleForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    vehicle_number: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
      await vehicleAPI.create(formData)
      setFormData({
        vehicle_number: '',
        make: '',
        model: '',
        year: new Date().getFullYear(),
        color: '',
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
        setError('Failed to add vehicle')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Add New Vehicle</h4>
        
        {error && (
          <div className="alert alert-danger" style={{ whiteSpace: 'pre-line' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Vehicle Number *</label>
              <input
                type="text"
                className="form-control"
                name="vehicle_number"
                value={formData.vehicle_number}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Make *</label>
              <input
                type="text"
                className="form-control"
                name="make"
                value={formData.make}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Model *</label>
              <input
                type="text"
                className="form-control"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Year *</label>
              <input
                type="number"
                className="form-control"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear() + 1}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Color</label>
              <input
                type="text"
                className="form-control"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Vehicle'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default VehicleForm
