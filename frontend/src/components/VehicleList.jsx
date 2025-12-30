import { useState, useEffect } from 'react'
import { vehicleAPI } from '../services/apiService'

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingVehicle, setEditingVehicle] = useState(null)

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const response = await vehicleAPI.getAll()
      setVehicles(response.data)
    } catch (err) {
      setError('Failed to load vehicles')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return

    try {
      await vehicleAPI.delete(id)
      setVehicles(vehicles.filter(v => v.id !== id))
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete vehicle')
    }
  }

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const response = await vehicleAPI.update(editingVehicle.id, editingVehicle)
      setVehicles(vehicles.map(v => v.id === editingVehicle.id ? response.data : v))
      setEditingVehicle(null)
    } catch (err) {
      alert(err.response?.data?.vehicle_number?.[0] || 'Failed to update vehicle')
    }
  }

  if (loading) return <div>Loading vehicles...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div>
      <h4>My Vehicles</h4>
      
      {editingVehicle && (
        <div className="card mb-3">
          <div className="card-body">
            <h5>Edit Vehicle</h5>
            <form onSubmit={handleUpdate}>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Vehicle Number"
                    value={editingVehicle.vehicle_number}
                    onChange={(e) => setEditingVehicle({...editingVehicle, vehicle_number: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Make"
                    value={editingVehicle.make}
                    onChange={(e) => setEditingVehicle({...editingVehicle, make: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Model"
                    value={editingVehicle.model}
                    onChange={(e) => setEditingVehicle({...editingVehicle, model: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Year"
                    value={editingVehicle.year}
                    onChange={(e) => setEditingVehicle({...editingVehicle, year: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Color"
                    value={editingVehicle.color}
                    onChange={(e) => setEditingVehicle({...editingVehicle, color: e.target.value})}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <button type="submit" className="btn btn-success me-2">Save</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditingVehicle(null)}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {vehicles.length === 0 ? (
        <p>No vehicles added yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Vehicle Number</th>
                <th>Make & Model</th>
                <th>Year</th>
                <th>Color</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(vehicle => (
                <tr key={vehicle.id}>
                  <td>{vehicle.vehicle_number}</td>
                  <td>{vehicle.make} {vehicle.model}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.color || '-'}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(vehicle)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(vehicle.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default VehicleList
