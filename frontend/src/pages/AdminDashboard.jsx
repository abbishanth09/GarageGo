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

  const greetingName = 'Admin'

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'radial-gradient(circle at 15% 15%, rgba(251, 191, 36, 0.15), transparent 40%), radial-gradient(circle at 85% 10%, rgba(245, 158, 11, 0.12), transparent 35%), #fef3c7'
    }}>
      <div className="container pt-4 pb-5">
        <h2>Admin Dashboard</h2>
        <p className="text-muted" style={{fontWeight: 600}}>Hi {greetingName}</p>

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
    </div>
  )
}

export default AdminDashboard
