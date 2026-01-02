import { useState } from 'react'
import { authAPI } from '../services/apiService'

const RegisterModal = ({ isOpen, onClose, onLogin, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phone: '',
    password: '',
    password2: '',
    role: 'customer',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.password2) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await authAPI.register(formData)
      onLogin(response.data.user, response.data.tokens)
      onClose()
    } catch (err) {
      const errorData = err.response?.data
      if (errorData) {
        const errorMessage = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join('\n')
        setError(errorMessage)
      } else {
        setError('Registration failed')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="modal-backdrop-blur"></div>
      <div className="register-modal">
        <div className="register-modal-content">
          <div className="register-modal-header">
            <h2 className="register-modal-title">Create Account</h2>
            <button className="register-modal-close" onClick={onClose}>×</button>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert" style={{ whiteSpace: 'pre-line' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control register-form-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control register-form-input"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control register-form-input"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-select register-form-input"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                <option value="mechanic">Mechanic</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control register-form-input"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control register-form-input"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              className="btn btn-gradient w-100 rounded-pill py-3"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Register Now'}
            </button>
          </form>

          <div className="text-center mt-3">
            <p className="text-muted small">
              Already have an account? <span className="text-gradient-link" style={{ cursor: 'pointer' }} onClick={onSwitchToLogin}>Login</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterModal
