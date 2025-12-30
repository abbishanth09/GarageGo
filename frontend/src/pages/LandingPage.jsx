import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-dark text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold mb-4">Welcome to <span className="text-primary">Garage</span><span className="text-warning">go</span></h1>
              <p className="lead mb-4">
                Your trusted partner for professional vehicle service and maintenance. 
                Book your service online with ease and get your vehicle back on the road.
              </p>
              <div className="d-flex gap-3">
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline-light btn-lg">
                  Login
                </Link>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <div className="display-1">🚗</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <h2 className="text-center mb-5">Why Choose Us?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 text-center p-4 border-0 shadow-sm">
              <div className="display-4 mb-3">⚡</div>
              <h4>Fast Service</h4>
              <p className="text-muted">
                Quick turnaround time with efficient service booking and scheduling
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 text-center p-4 border-0 shadow-sm">
              <div className="display-4 mb-3">👨‍🔧</div>
              <h4>Expert Mechanics</h4>
              <p className="text-muted">
                Certified professionals with years of experience in vehicle maintenance
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 text-center p-4 border-0 shadow-sm">
              <div className="display-4 mb-3">💰</div>
              <h4>Fair Pricing</h4>
              <p className="text-muted">
                Transparent pricing with no hidden charges. Quality service at competitive rates
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">Our Services</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">🔧</div>
                  <h5>Oil Change</h5>
                  <p className="text-muted small">Regular maintenance</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">🔩</div>
                  <h5>Brake Service</h5>
                  <p className="text-muted small">Safety first</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">⚙️</div>
                  <h5>Engine Repair</h5>
                  <p className="text-muted small">Expert diagnostics</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">🔍</div>
                  <h5>Inspection</h5>
                  <p className="text-muted small">Comprehensive check</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container py-5">
        <h2 className="text-center mb-5">How It Works</h2>
        <div className="row g-4">
          <div className="col-md-3 text-center">
            <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
              <span className="fw-bold">1</span>
            </div>
            <h5>Register</h5>
            <p className="text-muted">Create your account</p>
          </div>
          <div className="col-md-3 text-center">
            <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
              <span className="fw-bold">2</span>
            </div>
            <h5>Add Vehicle</h5>
            <p className="text-muted">Register your vehicle details</p>
          </div>
          <div className="col-md-3 text-center">
            <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
              <span className="fw-bold">3</span>
            </div>
            <h5>Book Service</h5>
            <p className="text-muted">Choose date and time slot</p>
          </div>
          <div className="col-md-3 text-center">
            <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
              <span className="fw-bold">4</span>
            </div>
            <h5>Get Service</h5>
            <p className="text-muted">Visit us at scheduled time</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Get Started?</h2>
          <p className="lead mb-4">Book your vehicle service appointment today!</p>
          <Link to="/register" className="btn btn-light btn-lg me-3">
            Register Now
          </Link>
          <Link to="/login" className="btn btn-outline-light btn-lg">
            Login to Your Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>🚗 Garagego</h5>
              <p className="text-muted">Professional Vehicle Service & Maintenance</p>
            </div>
            <div className="col-md-6 text-md-end">
              <h6>Contact Us</h6>
              <p className="text-muted mb-1">📞 Phone: +1 (555) 123-4567</p>
              <p className="text-muted mb-1">📧 Email: info@garagego.com</p>
              <p className="text-muted">📍 Address: 123 Main Street, City, State</p>
            </div>
          </div>
          <hr className="my-3 bg-secondary" />
          <div className="text-center text-muted">
            <small>&copy; 2025 Garagego. All rights reserved.</small>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
