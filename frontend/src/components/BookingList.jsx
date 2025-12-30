import { useState, useEffect } from 'react'
import { bookingAPI, authAPI } from '../services/apiService'
import { getStatusBadgeClass, getPaymentBadgeClass, formatDate, formatTime } from '../utils/helpers'
import { STATUS_OPTIONS, PAYMENT_STATUS_OPTIONS } from '../utils/constants'

const BookingList = ({ userRole, onUpdate }) => {
  const [bookings, setBookings] = useState([])
  const [mechanics, setMechanics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState({ status: '', payment_status: '' })

  useEffect(() => {
    fetchBookings()
    if (userRole === 'admin') {
      fetchMechanics()
    }
  }, [userRole])

  const fetchBookings = async () => {
    try {
      let response
      if (userRole === 'mechanic') {
        response = await bookingAPI.getMechanicBookings()
      } else {
        response = await bookingAPI.getAll(filter)
      }
      setBookings(response.data)
    } catch (err) {
      setError('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const fetchMechanics = async () => {
    try {
      const response = await authAPI.getMechanics()
      setMechanics(response.data)
    } catch (err) {
      console.error('Failed to load mechanics')
    }
  }

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await bookingAPI.updateStatus(bookingId, { status: newStatus })
      fetchBookings()
      if (onUpdate) onUpdate()
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update status')
    }
  }

  const handlePaymentUpdate = async (bookingId, paymentStatus) => {
    try {
      await bookingAPI.updatePayment(bookingId, { payment_status: paymentStatus })
      fetchBookings()
      if (onUpdate) onUpdate()
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update payment status')
    }
  }

  const handleApprove = async (bookingId, mechanicId = null) => {
    try {
      const data = mechanicId ? { mechanic_id: mechanicId } : {}
      await bookingAPI.approve(bookingId, data)
      fetchBookings()
      if (onUpdate) onUpdate()
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to approve booking')
    }
  }

  const handleAssignMechanic = async (bookingId, mechanicId) => {
    try {
      await bookingAPI.assignMechanic(bookingId, { mechanic_id: mechanicId })
      fetchBookings()
      if (onUpdate) onUpdate()
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to assign mechanic')
    }
  }

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return
    
    try {
      await bookingAPI.delete(bookingId)
      fetchBookings()
      if (onUpdate) onUpdate()
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to cancel booking')
    }
  }

  const handleFilterChange = (e) => {
    const newFilter = { ...filter, [e.target.name]: e.target.value }
    setFilter(newFilter)
  }

  const applyFilter = () => {
    fetchBookings()
  }

  if (loading) return <div>Loading bookings...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div>
      {userRole === 'admin' && (
        <div className="card mb-3">
          <div className="card-body">
            <h5>Filter Bookings</h5>
            <div className="row">
              <div className="col-md-4">
                <select
                  className="form-select"
                  name="status"
                  value={filter.status}
                  onChange={handleFilterChange}
                >
                  <option value="">All Statuses</option>
                  {STATUS_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <select
                  className="form-select"
                  name="payment_status"
                  value={filter.payment_status}
                  onChange={handleFilterChange}
                >
                  <option value="">All Payment Status</option>
                  {PAYMENT_STATUS_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <button className="btn btn-primary" onClick={applyFilter}>
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Booking #</th>
                <th>Date & Time</th>
                <th>Service</th>
                <th>Vehicle</th>
                {(userRole === 'admin' || userRole === 'mechanic') && <th>Customer</th>}
                {userRole === 'admin' && <th>Mechanic</th>}
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.booking_number}</td>
                  <td>
                    {formatDate(booking.booking_date)}<br />
                    <small>{formatTime(booking.time_slot)}</small>
                  </td>
                  <td>
                    {booking.service_name}<br />
                    <small className="text-muted">${booking.service_price}</small>
                  </td>
                  <td>
                    {booking.vehicle_number}<br />
                    <small className="text-muted">{booking.vehicle_details}</small>
                  </td>
                  {(userRole === 'admin' || userRole === 'mechanic') && (
                    <td>
                      {booking.customer_name}<br />
                      <small className="text-muted">{booking.customer_email}</small>
                    </td>
                  )}
                  {userRole === 'admin' && (
                    <td>
                      {booking.mechanic_name ? (
                        booking.mechanic_name
                      ) : (
                        <select
                          className="form-select form-select-sm"
                          onChange={(e) => handleAssignMechanic(booking.id, e.target.value)}
                          defaultValue=""
                        >
                          <option value="">Assign Mechanic</option>
                          {mechanics.map(mech => (
                            <option key={mech.id} value={mech.id}>{mech.username}</option>
                          ))}
                        </select>
                      )}
                    </td>
                  )}
                  <td>
                    <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getPaymentBadgeClass(booking.payment_status)}`}>
                      {booking.payment_status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group-vertical btn-group-sm">
                      {userRole === 'admin' && booking.status === 'pending' && (
                        <button
                          className="btn btn-success btn-sm mb-1"
                          onClick={() => handleApprove(booking.id)}
                        >
                          Approve
                        </button>
                      )}
                      
                      {(userRole === 'admin' || userRole === 'mechanic') && (
                        <select
                          className="form-select form-select-sm mb-1"
                          value={booking.status}
                          onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                        >
                          {STATUS_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      )}
                      
                      {userRole === 'admin' && (
                        <select
                          className="form-select form-select-sm mb-1"
                          value={booking.payment_status}
                          onChange={(e) => handlePaymentUpdate(booking.id, e.target.value)}
                        >
                          {PAYMENT_STATUS_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      )}
                      
                      {userRole === 'customer' && booking.status === 'pending' && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleCancel(booking.id)}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
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

export default BookingList
