import { Link } from 'react-router-dom'
import logoImg from '../assets/garagego-logo.png'

const Navbar = ({ user, onLogout, onOpenRegisterModal, onOpenLoginModal }) => {
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
                    onClick={onLogout}
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
    </nav>
  )
}

export default Navbar
