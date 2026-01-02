import { Link } from 'react-router-dom'
import logoImg from '../assets/garagego-logo.png'

const Navbar = ({ user, onLogout, onOpenRegisterModal, onOpenLoginModal }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-glass sticky-top py-0">
      <div className="container-lg">
        <a className="navbar-brand d-flex align-items-center" href="#home">
          <img 
            src={logoImg}
            alt="GarageGo" 
            style={{ height: '65px', width: 'auto' }}
          />
        </a>

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
                  <Link className="nav-link nav-link-modern" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="badge bg-light-subtle text-light-emphasis rounded-pill px-3 py-2 small fw-semibold">
                    {user.username} · {user.role}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm rounded-pill px-3 shadow-sm" onClick={onLogout}>
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
                    onClick={onOpenLoginModal}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-gradient btn-sm rounded-pill px-3 shadow-sm" 
                    onClick={onOpenRegisterModal}
                  >
                    Register
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
