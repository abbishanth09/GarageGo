import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import CustomerDashboard from './pages/CustomerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import MechanicDashboard from './pages/MechanicDashboard'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData, tokens) => {
    localStorage.setItem('access_token', tokens.access)
    localStorage.setItem('refresh_token', tokens.refresh)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    setUser(null)
  }

  if (loading) {
    return <div className="container mt-5 text-center">Loading...</div>
  }

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
        
        <Route
          path="/dashboard"
          element={
            user ? (
              user.role === 'customer' ? (
                <CustomerDashboard user={user} />
              ) : user.role === 'admin' ? (
                <AdminDashboard user={user} />
              ) : (
                <MechanicDashboard user={user} />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  )
}

export default App
