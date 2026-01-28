import { useState, useEffect } from 'react'
import { serviceAPI } from '../services/apiService'

const ServiceList = ({ isAdmin = false, onUpdate }) => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingService, setEditingService] = useState(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await serviceAPI.getAll()
      setServices(response.data)
    } catch (err) {
      setError('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return

    try {
      await serviceAPI.delete(id)
      setServices(services.filter(s => s.id !== id))
      if (onUpdate) onUpdate()
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete service')
    }
  }

  const handleEdit = (service) => {
    setEditingService(service)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const response = await serviceAPI.update(editingService.id, editingService)
      setServices(services.map(s => s.id === editingService.id ? response.data : s))
      setEditingService(null)
      if (onUpdate) onUpdate()
    } catch (err) {
      alert('Failed to update service')
    }
  }

  if (loading) return <div>Loading services...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div>
      <h4>Available Services</h4>
      
      {editingService && isAdmin && (
        <div className="card mb-3">
          <div className="card-body">
            <h5>Edit Service</h5>
            <form onSubmit={handleUpdate}>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Service Name"
                    value={editingService.name}
                    onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={editingService.price}
                    onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Duration (minutes)"
                    value={editingService.duration_minutes}
                    onChange={(e) => setEditingService({...editingService, duration_minutes: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <select
                    className="form-select"
                    value={editingService.is_active}
                    onChange={(e) => setEditingService({...editingService, is_active: e.target.value === 'true'})}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
                <div className="col-12 mb-2">
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    value={editingService.description}
                    onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                    rows="2"
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-success me-2">Save</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditingService(null)}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {services.length === 0 ? (
        <p>No services available.</p>
      ) : (
        <div className="row">
          {services.map(service => (
            <div key={service.id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    {service.name}
                    {!service.is_active && <span className="badge bg-secondary ms-2">Inactive</span>}
                  </h5>
                  <p className="card-text">{service.description}</p>
                  <p className="mb-1"><strong>Price:</strong> Rs {service.price}</p>
                  <p className="mb-1"><strong>Duration:</strong> {service.duration_minutes} minutes</p>
                  
                  {isAdmin && (
                    <div className="mt-3">
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(service)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(service.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ServiceList
