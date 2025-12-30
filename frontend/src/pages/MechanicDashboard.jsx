import { useState } from 'react'
import BookingList from '../components/BookingList'

const MechanicDashboard = ({ user }) => {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="container mt-4">
      <h2>Mechanic Dashboard</h2>
      <p className="text-muted">Welcome, {user.username}</p>

      <div className="card">
        <div className="card-header">
          <h5>My Assigned Bookings</h5>
        </div>
        <div className="card-body">
          <BookingList key={refreshKey} userRole="mechanic" onUpdate={handleRefresh} />
        </div>
      </div>
    </div>
  )
}

export default MechanicDashboard
