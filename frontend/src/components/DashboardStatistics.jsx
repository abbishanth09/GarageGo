import { useState, useEffect } from 'react'
import { dashboardAPI } from '../services/apiService'

const DashboardStatistics = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStatistics()
  }, [])

  const fetchStatistics = async () => {
    try {
      setLoading(true)
      const response = await dashboardAPI.getStatistics()
      setStats(response.data)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load statistics')
      console.error('Error fetching statistics:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-4">Loading dashboard...</div>
  if (error) return <div className="alert alert-danger">{error}</div>
  if (!stats) return <div className="alert alert-warning">No data available</div>

  return (
    <div className="mb-4">
      <h3 className="mb-4">Dashboard Overview</h3>
      
      {/* Stats Grid */}
      <div className="row">
        {/* Customers Card */}
        <div className="col-md-3 mb-3">
          <div className="card bg-light border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted text-uppercase">Active Customers</h6>
              <h2 className="text-primary mb-0">{stats.users.total_customers}</h2>
            </div>
          </div>
        </div>

        {/* Mechanics Card */}
        <div className="col-md-3 mb-3">
          <div className="card bg-light border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted text-uppercase">Active Mechanics</h6>
              <h2 className="text-success mb-0">{stats.users.total_mechanics}</h2>
            </div>
          </div>
        </div>

        {/* Services Card */}
        <div className="col-md-3 mb-3">
          <div className="card bg-light border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted text-uppercase">Active Services</h6>
              <h2 className="text-info mb-0">{stats.services.total_active_services}</h2>
            </div>
          </div>
        </div>

        {/* Total Bookings Card */}
        <div className="col-md-3 mb-3">
          <div className="card bg-light border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted text-uppercase">Total Bookings</h6>
              <h2 className="text-warning mb-0">{stats.bookings.total_bookings}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Status Row */}
      <div className="row mt-4">
        <div className="col-12">
          <h5>Booking Status Distribution</h5>
        </div>
        
        <div className="col-md-2 mb-3">
          <div className="card border-warning">
            <div className="card-body text-center">
              <h6 className="text-muted">Pending</h6>
              <h3 className="text-warning mb-0">{stats.bookings.pending}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-2 mb-3">
          <div className="card border-info">
            <div className="card-body text-center">
              <h6 className="text-muted">Approved</h6>
              <h3 className="text-info mb-0">{stats.bookings.approved}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-2 mb-3">
          <div className="card border-primary">
            <div className="card-body text-center">
              <h6 className="text-muted">In Progress</h6>
              <h3 className="text-primary mb-0">{stats.bookings.in_progress}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-2 mb-3">
          <div className="card border-success">
            <div className="card-body text-center">
              <h6 className="text-muted">Completed</h6>
              <h3 className="text-success mb-0">{stats.bookings.completed}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-2 mb-3">
          <div className="card border-danger">
            <div className="card-body text-center">
              <h6 className="text-muted">Cancelled</h6>
              <h3 className="text-danger mb-0">{stats.bookings.total_bookings - stats.bookings.pending - stats.bookings.approved - stats.bookings.in_progress - stats.bookings.completed}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-2 mb-3">
          <div className="card border-secondary">
            <div className="card-body text-center">
              <h6 className="text-muted">This Month</h6>
              <h3 className="text-secondary mb-0">{stats.monthly.bookings_this_month}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Revenue Row */}
      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card bg-light border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted text-uppercase">Paid Bookings</h6>
              <h3 className="text-success mb-0">{stats.payments.total_paid}</h3>
              <small className="text-muted">Out of {stats.bookings.total_bookings} total</small>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card bg-light border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted text-uppercase">Unpaid Bookings</h6>
              <h3 className="text-danger mb-0">{stats.payments.total_unpaid}</h3>
              <small className="text-muted">Pending payment</small>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card bg-light border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted text-uppercase">Total Revenue</h6>
              <h3 className="text-primary mb-0">Rs {stats.revenue.total_revenue.toFixed(2)}</h3>
              <small className="text-muted">From completed & paid bookings</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardStatistics
