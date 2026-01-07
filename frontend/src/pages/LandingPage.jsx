import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logoImg from '../assets/garagego-logo.png'
import carImg from '../assets/car.avif'
import garageImg from '../assets/Garage.webp'
import RegisterModal from '../components/RegisterModal'
import LoginModal from '../components/LoginModal'

const LandingPage = ({ user, isRegisterModalOpen, onRegisterModalChange, isLoginModalOpen, onLoginModalChange, onLogin }) => {
  const navigate = useNavigate()
  const greetingName = user ? (user.role === 'admin' ? 'Admin' : (user.username || 'User').split(' ')[0]) : null
  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="hero-section-modern">
        <div className="hero-bg-overlay"></div>
        <div className="hero-grid-lines"></div>
        <div className="container-lg">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="hero-content-modern">
                {greetingName && (
                  <h1 className="hero-title-modern mb-3" style={{ fontSize: '3.25rem', lineHeight: 1.1 }}>
                    Hi {greetingName}
                  </h1>
                )}
                <div className="badge-modern mb-4">
                  <span className="badge-dot"></span>
                  <span className="badge-text">TRUSTED BY 10K+ DRIVERS</span>
                </div>
                <h1 className="hero-title-modern mb-4">
                  Smart Vehicle Care,
                  <span className="text-gradient-modern d-block">Delivered Seamlessly</span>
                </h1>
                <p className="hero-subtitle-modern mb-5">
                  Experience next-generation vehicle maintenance with AI-powered diagnostics, instant booking, and real-time tracking. Your car deserves the best.
                </p>
                <div className="d-flex flex-wrap gap-3 mb-5">
                  <button 
                    onClick={() => onRegisterModalChange(true)}
                    className="btn-modern btn-modern-primary"
                  >
                    <span>Register</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div className="hero-stats-modern">
                  <div className="stat-item-modern">
                    <div className="stat-number-modern">240+</div>
                    <div className="stat-label-modern">Monthly Bookings</div>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item-modern">
                    <div className="stat-number-modern">4.9/5</div>
                    <div className="stat-label-modern">Customer Rating</div>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item-modern">
                    <div className="stat-number-modern">24/7</div>
                    <div className="stat-label-modern">Live Support</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image-modern">
                <div className="floating-card floating-card-1">
                  <div className="card-icon">⚡</div>
                  <div>
                    <div className="card-title">Fast Service</div>
                    <div className="card-desc">45 min average</div>
                  </div>
                </div>
                <div className="floating-card floating-card-2">
                  <div className="card-icon">🔒</div>
                  <div>
                    <div className="card-title">Secure Booking</div>
                    <div className="card-desc">100% Protected</div>
                  </div>
                </div>
                <div className="hero-image-backdrop"></div>
                <img 
                  src={garageImg} 
                  alt="Professional Garage Service" 
                  className="hero-image-main"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <p className="section-label">Why choose us</p>
            <h2 className="section-title mb-3">Service built for momentum</h2>
            <p className="section-subtitle">From first click to pickup, every step is designed to keep you moving.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card h-100">
                <div className="feature-icon-wrapper mb-3">
                  <div className="feature-icon">⚡</div>
                </div>
                <h5 className="card-title mb-3">Faster turnarounds</h5>
                <p className="card-text mb-3">Book instantly, lock your slot, and track progress live—no phone tag.</p>
                <span className="feature-badge">Same-day slots</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card h-100">
                <div className="feature-icon-wrapper mb-3">
                  <div className="feature-icon">🛠️</div>
                </div>
                <h5 className="card-title mb-3">Certified mechanics</h5>
                <p className="card-text mb-3">ASE-level expertise with vetted parts, torque specs, and quality control.</p>
                <span className="feature-badge">Multi-point QA</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card h-100">
                <div className="feature-icon-wrapper mb-3">
                  <div className="feature-icon">💳</div>
                </div>
                <h5 className="card-title mb-3">Transparent pricing</h5>
                <p className="card-text mb-3">Flat-rate menus, upfront estimates, and digital approvals—no surprises.</p>
                <span className="feature-badge">No hidden fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <p className="section-label">About us</p>
              <h2 className="section-title mb-4">Redefining automotive care with technology</h2>
              <p className="about-text mb-4">
                GarageGo was founded on a simple belief: vehicle maintenance should be transparent, convenient, and stress-free. We've built a platform that connects drivers with certified mechanics, real-time tracking, and upfront pricing—eliminating the guesswork from automotive care.
              </p>
              <p className="about-text mb-4">
                Our team combines decades of automotive expertise with modern technology to deliver a service experience that fits your schedule. From express maintenance to comprehensive diagnostics, we're committed to keeping you on the road with confidence.
              </p>
              <div className="d-flex flex-wrap gap-4 mt-4">
                <div>
                  <div className="about-stat">5+</div>
                  <div className="about-stat-label">Years serving</div>
                </div>
                <div>
                  <div className="about-stat">50+</div>
                  <div className="about-stat-label">Certified mechanics</div>
                </div>
                <div>
                  <div className="about-stat">10k+</div>
                  <div className="about-stat-label">Happy customers</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-image-grid">
                <div className="about-card">
                  <div className="about-card-icon">🎯</div>
                  <h5 className="about-card-title">Our Mission</h5>
                  <p className="about-card-text">To make premium vehicle care accessible and transparent for everyone.</p>
                </div>
                <div className="about-card">
                  <div className="about-card-icon">🌟</div>
                  <h5 className="about-card-title">Our Vision</h5>
                  <p className="about-card-text">A world where automotive maintenance is seamless, trustworthy, and stress-free.</p>
                </div>
                <div className="about-card">
                  <div className="about-card-icon">💪</div>
                  <h5 className="about-card-title">Our Values</h5>
                  <p className="about-card-text">Quality, transparency, and customer satisfaction drive everything we do.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-5">
            <div>
              <p className="section-label">Our services</p>
              <h2 className="section-title mb-2">Everything your vehicle needs</h2>
              <p className="section-subtitle mb-0">Pick a package or customize—every job is tracked and verified.</p>
            </div>
            <Link to="/register" className="btn btn-outline-primary rounded-pill px-4">
              View pricing
            </Link>
          </div>
          <div className="row g-4">
            {[{
              icon: '🔧',
              title: 'Express maintenance',
              desc: 'Oil, filters, fluids, and quick inspections to keep you road-ready.',
              tag: '45 min avg'
            }, {
              icon: '🛡️',
              title: 'Brake & safety',
              desc: 'Pads, rotors, ABS diagnostics, and torque-verified installations.',
              tag: 'Safety first'
            }, {
              icon: '⚙️',
              title: 'Engine & performance',
              desc: 'Check-engine scans, tune-ups, timing components, and cooling systems.',
              tag: 'Diagnostics'
            }, {
              icon: '🧭',
              title: 'Full inspection',
              desc: 'Comprehensive multi-point health reports with prioritized actions.',
              tag: 'Report included'
            }].map((item, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <div className="service-card h-100">
                  <div className="service-icon">{item.icon}</div>
                  <h5 className="text-dark mb-2">{item.title}</h5>
                  <p className="text-muted small mb-3">{item.desc}</p>
                  <span className="service-pill">{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="steps-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <p className="section-label">How it works</p>
            <h2 className="section-title mb-3">Four steps from tap to pickup</h2>
            <p className="section-subtitle">We keep the workflow simple, transparent, and always trackable.</p>
          </div>
          <div className="row g-4">
            {[{
              step: '1',
              title: 'Create your account',
              desc: 'Sign up and set your profile preferences to speed up future bookings.'
            }, {
              step: '2',
              title: 'Add your vehicle',
              desc: 'VIN, trim, and mileage help us match the right parts and labor.'
            }, {
              step: '3',
              title: 'Book and approve',
              desc: 'Pick a slot, get an estimate, approve digitally, and drop off or wait.'
            }, {
              step: '4',
              title: 'Track and pickup',
              desc: 'Follow live updates, receive QA photos, and drive off on time.'
            }].map((item, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <div className="step-card h-100">
                  <div className="step-badge">{item.step}</div>
                  <h5 className="card-title mb-3">{item.title}</h5>
                  <p className="card-text mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container text-center">
          <h2 className="cta-title mb-3">Ready to get started?</h2>
          <p className="cta-subtitle mb-5">Book your next service in under two minutes.</p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <button 
              onClick={() => onRegisterModalChange(true)}
              className="btn btn-gradient btn-lg rounded-pill px-5 py-3"
            >
              Register now
            </button>
            <button 
              onClick={() => onLoginModalChange(true)}
              className="btn btn-outline-primary btn-lg rounded-pill px-5 py-3"
            >
              Log in
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-5">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-4">
              <a href="#home" style={{ display: 'inline-block' }}>
                <img 
                  src={logoImg} 
                  alt="GarageGo" 
                  style={{ height: '60px', width: 'auto', marginBottom: '1.5rem', cursor: 'pointer' }}
                />
              </a>
              <small className="text-muted d-block mb-3">Service · Scheduling · Status</small>
              <p className="text-muted mb-3">We keep your vehicles in motion with transparent workflows, certified mechanics, and real-time updates.</p>
              <div className="d-flex gap-3">
                <span className="footer-chip">24/7 updates</span>
                <span className="footer-chip">Trusted by fleets</span>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row g-3">
                <div className="col-6 col-md-4">
                  <h6 className="text-dark mb-3">Menu</h6>
                  <ul className="list-unstyled small text-muted mb-0">
                    <li><a className="footer-link" href="#home">Home</a></li>
                    <li><a className="footer-link" href="#about">About Us</a></li>
                    <li><button className="footer-link" onClick={() => onLoginModalChange(true)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Login</button></li>
                  </ul>
                </div>
                <div className="col-6 col-md-4">
                  <h6 className="text-dark mb-3">Support</h6>
                  <ul className="list-unstyled small text-muted mb-0">
                    <li><span className="footer-text">help@garagego.com</span></li>
                    <li><span className="footer-text">+94 78 123 4567</span></li>
                    <li><span className="footer-text">Knowledge base</span></li>
                  </ul>
                </div>
                <div className="col-12 col-md-4">
                  <h6 className="text-dark mb-3">Locations</h6>
                  <ul className="list-unstyled small text-muted mb-0">
                    <li><span className="footer-text">Colombo</span></li>
                    <li><span className="footer-text">Hatton</span></li>
                    <li><span className="footer-text">Badulla</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <h6 className="text-dark mb-3">Stay updated</h6>
              <p className="text-muted small mb-3">Get maintenance reminders, slot releases, and seasonal checks.</p>
              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-outline-dark btn-sm rounded-pill px-3">Enable alerts</button>
                <button className="btn btn-gradient btn-sm rounded-pill px-3">Join now</button>
              </div>
            </div>
          </div>
          <hr className="text-secondary opacity-25 my-4" />
          <div className="d-flex flex-column flex-md-row justify-content-between text-muted small">
            <span>&copy; 2025 GarageGo. All rights reserved to APT Group-12.</span>
            <div className="d-flex gap-3">
              <span className="footer-text">Privacy</span>
              <span className="footer-text">Terms</span>
              <span className="footer-text">Cookies</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Register Modal */}
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => onRegisterModalChange(false)} 
        onLogin={onLogin}
        onSwitchToLogin={() => {
          onRegisterModalChange(false)
          onLoginModalChange(true)
        }}
      />

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => onLoginModalChange(false)} 
        onLogin={onLogin}
        onSwitchToRegister={() => {
          onLoginModalChange(false)
          onRegisterModalChange(true)
        }}
      />
    </div>
  )
}

export default LandingPage
