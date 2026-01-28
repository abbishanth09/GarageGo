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
  const [validationErrors, setValidationErrors] = useState({})

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validate Sri Lankan phone number
  const validateSriLankanPhone = (phone) => {
    // Remove spaces and dashes
    const cleanPhone = phone.replace(/[\s-]/g, '')
    
    // Sri Lankan mobile: 07X XXX XXXX (10 digits starting with 07)
    // Sri Lankan landline: 0XX XXX XXXX (9-10 digits starting with 0)
    const mobileRegex = /^07[0-9]{8}$/
    const landlineRegex = /^0[1-9][0-9]{7,8}$/
    
    return mobileRegex.test(cleanPhone) || landlineRegex.test(cleanPhone)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: '',
      })
    }

    // Real-time validation
    if (name === 'email' && value) {
      if (!validateEmail(value)) {
        setValidationErrors({
          ...validationErrors,
          email: 'Please enter a valid email address',
        })
      }
    }

    if (name === 'phone' && value) {
      if (!validateSriLankanPhone(value)) {
        setValidationErrors({
          ...validationErrors,
          phone: 'Please enter a valid Sri Lankan phone number (e.g., 0771234567 or 0112345678)',
        })
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setValidationErrors({})

    // Validate email
    if (!validateEmail(formData.email)) {
      setValidationErrors({ email: 'Please enter a valid email address' })
      return
    }

    // Validate phone if provided
    if (formData.phone && !validateSriLankanPhone(formData.phone)) {
      setValidationErrors({ phone: 'Please enter a valid Sri Lankan phone number (e.g., 0771234567 or 0112345678)' })
      return
    }

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
      <div className="modal-backdrop-blur" onClick={onClose}></div>
      <div className="register-modal">
        <div className="login-modal-glass" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-glass" onClick={onClose}>×</button>
          <div className="modal-header-glass">
            <h2 className="modal-title-glass">Create Account</h2>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert" style={{ whiteSpace: 'pre-line' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-medium mb-2">Email</label>
              <input
                type="email"
                className={`form-control form-control-glass ${validationErrors.email ? 'is-invalid' : ''}`}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {validationErrors.email && (
                <div className="invalid-feedback d-block">
                  {validationErrors.email}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium mb-2">Username</label>
              <input
                type="text"
                className="form-control form-control-glass"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium mb-2">Phone</label>
              <input
                type="tel"
                className={`form-control form-control-glass ${validationErrors.phone ? 'is-invalid' : ''}`}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0771234567 or 0112345678"
              />
              {validationErrors.phone && (
                <div className="invalid-feedback d-block">
                  {validationErrors.phone}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium mb-2">Role</label>
              <select
                className="form-select form-control-glass"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="customer">Customer</option>
                <option value="mechanic">Mechanic</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium mb-2">Password</label>
              <input
                type="password"
                className="form-control form-control-glass"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-medium mb-2">Confirm Password</label>
              <input
                type="password"
                className="form-control form-control-glass"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              className="btn btn-gradient w-100 rounded-pill py-3 mt-2"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Register Now'}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted small mb-0">
              Already have an account? <span className="text-gradient fw-semibold" style={{ cursor: 'pointer', textDecoration: 'none' }} onClick={onSwitchToLogin}>Login</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterModal
