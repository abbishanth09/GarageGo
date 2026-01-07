import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logoImg from '../assets/garagego-logo.png'

const Navbar = ({ user, onLogout, onOpenRegisterModal, onOpenLoginModal }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const navigate = useNavigate()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-glass sticky-top py-0">
      <div className="container-lg">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src={logoImg}
            alt="GarageGo" 
            style={{ height: '65px', width: 'auto' }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {user ? (
              <>
                <li className="nav-item">
                  <Link 
                    className="nav-link nav-link-modern" 
                    to="/dashboard"
                    style={{ 
                      color: '#1f2937', 
                      fontWeight: '600',
                      fontSize: '16px'
                    }}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-sm rounded-pill px-4 shadow-sm fw-semibold" 
                    onClick={() => setShowLogoutConfirm(true)}
                    style={{ 
                      backgroundColor: '#dc2626', 
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 20px'
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link nav-link-modern" href="#home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link nav-link-modern" href="#about">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link nav-link-modern"
                    onClick={onOpenRegisterModal}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Register
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-gradient rounded-pill px-4 py-2 shadow-sm fw-bold"
                    onClick={onOpenLoginModal}
                  >
                    Login
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {showLogoutConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="logoutConfirmTitle"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
          }}
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="card"
            style={{
              width: 'min(92vw, 420px)',
              borderRadius: 16,
              boxShadow: '0 16px 48px rgba(15,23,42,0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body p-4">
              <h5 id="logoutConfirmTitle" className="mb-2" style={{ color: '#0f172a', fontWeight: 700 }}>
                Log out?
              </h5>
              <p className="mb-4" style={{ color: '#64748b' }}>
                You’ll be signed out of your account.
              </p>
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-light rounded-pill px-3"
                  onClick={() => setShowLogoutConfirm(false)}
                  style={{ border: '1px solid rgba(15,23,42,0.12)' }}
                >
                  Cancel
                </button>
                <button
                  className="btn rounded-pill px-3 fw-semibold"
                  onClick={() => { 
                    setShowLogoutConfirm(false); 
                    onLogout && onLogout();
                    navigate('/');
                  }}
                  style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none' }}
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
