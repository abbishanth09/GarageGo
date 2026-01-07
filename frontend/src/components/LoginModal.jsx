import { useState } from 'react'
import { authAPI } from '../services/apiService'

const LoginModal = ({ isOpen, onClose, onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    setLoading(true)

    try {
      const response = await authAPI.login(formData)
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
        setError('Login failed')
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
            <h2 className="modal-title-glass">Welcome Back</h2>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert" style={{ whiteSpace: 'pre-line' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-medium mb-2">Email</label>
              <input
                type="email"
                className="form-control form-control-glass"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>

            <div className="mb-4">
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

            <button
              type="submit"
              className="btn btn-gradient w-100 rounded-pill py-3 mt-2"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted small mb-0">
              Don't have an account? <span className="text-gradient fw-semibold" style={{ cursor: 'pointer', textDecoration: 'none' }} onClick={onSwitchToRegister}>Register</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginModal
