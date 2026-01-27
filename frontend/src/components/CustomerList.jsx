import { useState, useEffect } from 'react'
import { userAPI } from '../services/apiService'

const CustomerList = ({ refreshKey, onUpdate }) => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCustomers()
  }, [refreshKey])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const response = await userAPI.getUsersByRole('customer')
      setCustomers(response.data)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch customers')
      console.error('Error fetching customers:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (customerId, currentStatus) => {
    if (!window.confirm(`Are you sure you want to ${currentStatus ? 'deactivate' : 'activate'} this customer?`)) {
      return
    }

    try {
      await userAPI.toggleUserActive(customerId)
      onUpdate()
      await fetchCustomers()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update customer status')
      console.error('Error toggling customer status:', err)
    }
  }

  const handleDeleteCustomer = async (customerId, customerEmail) => {
    if (!window.confirm(`Are you sure you want to permanently delete customer ${customerEmail}? This action cannot be undone.`)) {
      return
    }

    try {
      await userAPI.deleteUser(customerId)
      onUpdate()
      await fetchCustomers()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete customer')
      console.error('Error deleting customer:', err)
    }
  }

  if (loading) return <div className="text-center py-4">Loading customers...</div>

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
            {customers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">No customers found</td>
              </tr>
            ) : (
              customers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.email}</td>
                  <td>{customer.username}</td>
                  <td>{customer.phone || '-'}</td>
                  <td>
                    <span className={`badge ${customer.is_active ? 'bg-success' : 'bg-danger'}`}>
                      {customer.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(customer.date_joined).toLocaleDateString()}</td>
                  <td>
                    <button
                      className={`btn btn-sm ${customer.is_active ? 'btn-warning' : 'btn-success'} me-2`}
                      onClick={() => handleToggleActive(customer.id, customer.is_active)}
                      title={customer.is_active ? 'Deactivate customer' : 'Activate customer'}
                    >
                      {customer.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteCustomer(customer.id, customer.email)}
                      title="Delete customer"
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

export default CustomerList
