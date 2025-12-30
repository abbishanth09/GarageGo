import { useState } from 'react'
import BookingList from '../components/BookingList'
import ServiceList from '../components/ServiceList'
import ServiceForm from '../components/ServiceForm'

const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('bookings')
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <p className="text-muted">Welcome, {user.username}</p>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            All Bookings
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Manage Services
          </button>
        </li>
      </ul>

      <div className="tab-content">
        {activeTab === 'bookings' && (
          <BookingList key={refreshKey} userRole="admin" onUpdate={handleRefresh} />
        )}

        {activeTab === 'services' && (
          <div>
            <ServiceForm onSuccess={handleRefresh} />
            <hr />
            <ServiceList key={refreshKey} isAdmin={true} onUpdate={handleRefresh} />
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
