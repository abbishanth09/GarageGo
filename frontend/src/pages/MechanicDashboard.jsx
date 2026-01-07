import { useState } from 'react'
import BookingList from '../components/BookingList'

const MechanicDashboard = ({ user }) => {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  const greetingName = (user?.username || 'User').split(' ')[0]

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'radial-gradient(circle at 15% 15%, rgba(251, 191, 36, 0.15), transparent 40%), radial-gradient(circle at 85% 10%, rgba(245, 158, 11, 0.12), transparent 35%), #fef3c7'
    }}>
      <div className="container pt-4 pb-5">
        <h2>Mechanic Dashboard</h2>
        <p className="text-muted" style={{fontWeight: 600}}>Hi {greetingName}</p>

      <div className="card">
        <div className="card-header">
          <h5>My Assigned Bookings</h5>
        </div>
        <div className="card-body">
          <BookingList key={refreshKey} userRole="mechanic" onUpdate={handleRefresh} />
        </div>
      </div>
      </div>
    </div>
  )
}

export default MechanicDashboard
