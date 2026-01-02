import { useState } from 'react'
import { authAPI } from '../services/apiService'

const LoginModal = ({ isOpen, onClose, onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
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
      <div className="modal-backdrop-blur"></div>
      <div className="register-modal">
        <div className="register-modal-content">
          <div className="register-modal-header">
            <h2 className="register-modal-title">Welcome Back</h2>
            <button className="register-modal-close" onClick={onClose}>×</button>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert" style={{ whiteSpace: 'pre-line' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control register-form-input"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>

            <div className="mb-4">
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

            <button
              type="submit"
              className="btn btn-gradient w-100 rounded-pill py-3"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-3">
            <p className="text-muted small">
              Don't have an account? <span className="text-gradient-link" style={{ cursor: 'pointer' }} onClick={onSwitchToRegister}>Register</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginModal
