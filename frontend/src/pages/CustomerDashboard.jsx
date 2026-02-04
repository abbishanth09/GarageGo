import { useState, useEffect } from 'react'
import VehicleList from '../components/VehicleList'
import VehicleForm from '../components/VehicleForm'
import BookingForm from '../components/BookingForm'
import BookingList from '../components/BookingList'
import ServiceList from '../components/ServiceList'
import { offerAPI } from '../services/apiService'

const CustomerDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('bookings')
  const [refreshKey, setRefreshKey] = useState(0)
  const [activeOffers, setActiveOffers] = useState([])
  const [loadingOffers, setLoadingOffers] = useState(true)

  useEffect(() => {
    fetchActiveOffers()
  }, [])

  const fetchActiveOffers = async () => {
    try {
      const response = await offerAPI.getAll()
      // Extract array from response - handle both direct array and object with data property
      setActiveOffers(Array.isArray(response) ? response : (response.data || []))
    } catch (error) {
      console.error('Failed to load offers:', error)
    } finally {
      setLoadingOffers(false)
    }
  }

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
        <h2>Customer Dashboard</h2>
        <p className="text-muted" style={{fontWeight: 600}}>Hi {greetingName}</p>
        {/* Active Offers Section */}
        {!loadingOffers && activeOffers.length > 0 && (
          <div className="mb-5">
            <h4 className="mb-3" style={{ color: '#d97706', fontWeight: 'bold' }}>
              🎉 Special Offers Just For You
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {activeOffers.map((offer) => (
                <div 
                  key={offer.id} 
                  style={{
                    background: `linear-gradient(135deg, ${offer.discount_percentage ? '#fbbf24' : '#10b981'} 0%, ${offer.discount_percentage ? '#f59e0b' : '#059669'} 100%)`,
                    borderRadius: '12px',
                    padding: '24px',
                    color: 'white',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Discount Badge */}
                  {offer.discount_percentage && (
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      background: 'rgba(255,255,255,0.2)',
                      borderRadius: '50%',
                      width: '100px',
                      height: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                    }}>
                      {offer.discount_percentage}%
                    </div>
                  )}

                  {/* Content */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <h5 style={{
                      fontSize: '22px',
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                    }}>
                      {offer.title}
                    </h5>

                    <p style={{
                      fontSize: '14px',
                      marginBottom: '15px',
                      lineHeight: '1.5',
                      opacity: '0.95'
                    }}>
                      {offer.message}
                    </p>

                    {/* Footer Info */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderTop: '1px solid rgba(255,255,255,0.3)',
                      paddingTop: '12px',
                      marginTop: '12px'
                    }}>
                      <small style={{ opacity: '0.9' }}>
                        ⏰ Valid until: <strong>{new Date(offer.valid_until).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</strong>
                      </small>
                      <span style={{
                        background: 'rgba(255,255,255,0.3)',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        ACTIVE
                      </span>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-30px',
                    left: '-30px',
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%'
                  }}></div>
                </div>
              ))}
            </div>
          </div>
        )}

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
    </div>
  )
}

export default CustomerDashboard
