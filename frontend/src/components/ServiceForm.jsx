import { useState } from 'react'
import { serviceAPI } from '../services/apiService'

const ServiceForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration_minutes: 60,
    is_active: true,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await serviceAPI.create(formData)
      setFormData({
        name: '',
        description: '',
        price: '',
        duration_minutes: 60,
        is_active: true,
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
        setError('Failed to add service')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Add New Service</h4>
        
        {error && (
          <div className="alert alert-danger" style={{ whiteSpace: 'pre-line' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Service Name *</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Price *</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Duration (minutes) *</label>
              <input
                type="number"
                className="form-control"
                name="duration_minutes"
                value={formData.duration_minutes}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Status</label>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                />
                <label className="form-check-label">Active</label>
              </div>
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">Description *</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Service'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ServiceForm
