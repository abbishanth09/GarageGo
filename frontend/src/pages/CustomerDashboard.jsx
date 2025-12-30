import { useState, useEffect } from 'react'
import VehicleList from '../components/VehicleList'
import VehicleForm from '../components/VehicleForm'
import BookingForm from '../components/BookingForm'
import BookingList from '../components/BookingList'
import ServiceList from '../components/ServiceList'

const CustomerDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('bookings')
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="container mt-4">
      <h2>Customer Dashboard</h2>
      <p className="text-muted">Welcome, {user.username}</p>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            My Bookings
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'create-booking' ? 'active' : ''}`}
            onClick={() => setActiveTab('create-booking')}
          >
            Create Booking
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'vehicles' ? 'active' : ''}`}
            onClick={() => setActiveTab('vehicles')}
          >
            My Vehicles
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Services
          </button>
        </li>
      </ul>

      <div className="tab-content">
        {activeTab === 'bookings' && (
          <BookingList key={refreshKey} userRole="customer" />
        )}

        {activeTab === 'create-booking' && (
          <div>
            <BookingForm onSuccess={() => {
              setActiveTab('bookings')
              handleRefresh()
            }} />
          </div>
        )}

        {activeTab === 'vehicles' && (
          <div>
            <VehicleForm onSuccess={handleRefresh} />
            <hr />
            <VehicleList key={refreshKey} />
          </div>
        )}

        {activeTab === 'services' && (
          <ServiceList />
        )}
      </div>
    </div>
  )
}

export default CustomerDashboard
