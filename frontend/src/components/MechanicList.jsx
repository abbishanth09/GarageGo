import { useState, useEffect } from 'react'
import { userAPI } from '../services/apiService'

const MechanicList = ({ refreshKey, onUpdate }) => {
  const [mechanics, setMechanics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMechanics()
  }, [refreshKey])

  const fetchMechanics = async () => {
    try {
      setLoading(true)
      const response = await userAPI.getUsersByRole('mechanic')
      setMechanics(response.data)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch mechanics')
      console.error('Error fetching mechanics:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (mechanicId, currentStatus) => {
    if (!window.confirm(`Are you sure you want to ${currentStatus ? 'deactivate' : 'activate'} this mechanic?`)) {
      return
    }

    try {
      await userAPI.toggleUserActive(mechanicId)
      onUpdate()
      await fetchMechanics()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update mechanic status')
      console.error('Error toggling mechanic status:', err)
    }
  }

  const handleDeleteMechanic = async (mechanicId, mechanicEmail) => {
    if (!window.confirm(`Are you sure you want to permanently delete mechanic ${mechanicEmail}? This action cannot be undone.`)) {
      return
    }

    try {
      await userAPI.deleteUser(mechanicId)
      onUpdate()
      await fetchMechanics()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete mechanic')
      console.error('Error deleting mechanic:', err)
    }
  }

  if (loading) return <div className="text-center py-4">Loading mechanics...</div>

  return (
    <div>
      {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {error}
        <button type="button" className="btn-close" onClick={() => setError(null)}></button>
      </div>}

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-light">
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mechanics.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">No mechanics found</td>
              </tr>
            ) : (
              mechanics.map(mechanic => (
                <tr key={mechanic.id}>
                  <td>{mechanic.email}</td>
                  <td>{mechanic.username}</td>
                  <td>{mechanic.phone || '-'}</td>
                  <td>
                    <span className={`badge ${mechanic.is_active ? 'bg-success' : 'bg-danger'}`}>
                      {mechanic.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(mechanic.date_joined).toLocaleDateString()}</td>
                  <td>
                    <button
                      className={`btn btn-sm ${mechanic.is_active ? 'btn-warning' : 'btn-success'} me-2`}
                      onClick={() => handleToggleActive(mechanic.id, mechanic.is_active)}
                      title={mechanic.is_active ? 'Deactivate mechanic' : 'Activate mechanic'}
                    >
                      {mechanic.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteMechanic(mechanic.id, mechanic.email)}
                      title="Delete mechanic"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MechanicList
