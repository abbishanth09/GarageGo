import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container-lg">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill hero-chip mb-3">
                <span className="hero-dot"></span>
                <small className="fw-semibold text-uppercase">Book · Track · Drive</small>
              </div>
              <h1 className="hero-title mb-4">
                Premium vehicle care that fits your schedule.
              </h1>
              <p className="hero-subtitle mb-4">
                Garagego keeps your car in peak shape with real-time booking, certified mechanics, and updates that meet you where you are.
              </p>
              <div className="d-flex flex-wrap gap-3 align-items-center">
                <Link to="/register" className="btn btn-gradient btn-lg rounded-pill px-4 shadow-lg">
                  Book a service
                </Link>
                <Link to="/login" className="btn btn-outline-dark btn-lg rounded-pill px-4">
                  Sign in
                </Link>
                <div className="d-flex align-items-center gap-3">
                  <div className="hero-avatar">🚗</div>
                  <div className="small text-muted">
                    Trusted by drivers, fleets, and busy schedulers.
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap gap-4 mt-4 hero-stats">
                <div>
                  <div className="fs-2 fw-bold text-dark">+240</div>
                  <div className="text-muted small">Monthly bookings</div>
                </div>
                <div>
                  <div className="fs-2 fw-bold text-dark">4.9★</div>
                  <div className="text-muted small">Customer rating</div>
                </div>
                <div>
                  <div className="fs-2 fw-bold text-dark">24/7</div>
                  <div className="text-muted small">Status updates</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-visual card border-0 shadow-lg overflow-hidden">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge rounded-pill text-bg-light text-dark px-3 py-2">Live booking</span>
                    <span className="text-muted small">Today · 2:30 PM</span>
                  </div>
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <div className="hero-vehicle">🚙</div>
                    </div>
                    <div className="col">
                      <h5 className="mb-1 text-dark">Brake & Safety Check</h5>
                      <p className="text-muted small mb-2">Assigned to Alex · Bay 3</p>
                      <div className="progress hero-progress" style={{height: '8px'}}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{width: '68%'}}
                          aria-valuenow="68"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <hr className="text-secondary opacity-25 my-4" />
                  <div className="row g-3 text-muted small">
                    <div className="col-6 d-flex align-items-center gap-2">
                      <span className="hero-icon">🕒</span>
                      <span>ETA: 45 mins</span>
                    </div>
                    <div className="col-6 d-flex align-items-center gap-2">
                      <span className="hero-icon">✅</span>
                      <span>Parts in stock</span>
                    </div>
                    <div className="col-6 d-flex align-items-center gap-2">
                      <span className="hero-icon">📍</span>
                      <span>Garagego Downtown</span>
                    </div>
                    <div className="col-6 d-flex align-items-center gap-2">
                      <span className="hero-icon">🔔</span>
                      <span>Live notifications on</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-bg-accent"></div>
      </section>

      {/* Features Section */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <p className="text-accent fw-semibold small text-uppercase tracking-tight">Why choose us</p>
          <h2 className="fw-bold text-dark">Service built for momentum</h2>
          <p className="text-muted mb-0">From first click to pickup, every step is designed to keep you moving.</p>
        </div>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="feature-card h-100">
              <div className="d-flex align-items-start gap-3">
                <div className="feature-icon">⚡</div>
                <div>
                  <h5 className="text-dark mb-2">Faster turnarounds</h5>
                  <p className="text-muted mb-3">Book instantly, lock your slot, and track progress live—no phone tag.</p>
                  <span className="feature-badge">Same-day slots</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card h-100">
              <div className="d-flex align-items-start gap-3">
                <div className="feature-icon">🛠️</div>
                <div>
                  <h5 className="text-dark mb-2">Certified mechanics</h5>
                  <p className="text-muted mb-3">ASE-level expertise with vetted parts, torque specs, and quality control.</p>
                  <span className="feature-badge">Multi-point QA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card h-100">
              <div className="d-flex align-items-start gap-3">
                <div className="feature-icon">💳</div>
                <div>
                  <h5 className="text-dark mb-2">Transparent pricing</h5>
                  <p className="text-muted mb-3">Flat-rate menus, upfront estimates, and digital approvals—no surprises.</p>
                  <span className="feature-badge">No hidden fees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
            <div>
              <p className="text-accent fw-semibold small text-uppercase tracking-tight">Our services</p>
              <h2 className="fw-bold text-dark mb-1">Everything your vehicle needs</h2>
              <p className="text-muted mb-0">Pick a package or customize—every job is tracked and verified.</p>
            </div>
            <Link to="/register" className="btn btn-outline-dark rounded-pill px-4">
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
      <section className="container py-5">
        <div className="text-center mb-5">
          <p className="text-accent fw-semibold small text-uppercase tracking-tight">How it works</p>
          <h2 className="fw-bold text-dark">Four steps from tap to pickup</h2>
          <p className="text-muted mb-0">We keep the workflow simple, transparent, and always trackable.</p>
        </div>
        <div className="row g-4 align-items-stretch">
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
                <h5 className="text-dark mb-2">{item.title}</h5>
                <p className="text-muted mb-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <div className="cta-section py-5">
        <div className="container text-center">
          <h2 className="fw-bold text-dark mb-3">Ready to get started?</h2>
          <p className="text-muted mb-4">Book your next service in under two minutes.</p>
          <Link to="/register" className="btn btn-gradient btn-lg rounded-pill px-4 me-3">
            Register now
          </Link>
          <Link to="/login" className="btn btn-outline-dark btn-lg rounded-pill px-4">
            Log in
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer py-5">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="brand-mark">🚗</div>
                <div>
                  <h5 className="mb-0 text-dark">Garagego</h5>
                  <small className="text-muted">Service · Scheduling · Status</small>
                </div>
              </div>
              <p className="text-muted mb-3">We keep your vehicles in motion with transparent workflows, certified mechanics, and real-time updates.</p>
              <div className="d-flex gap-3">
                <span className="footer-chip">24/7 updates</span>
                <span className="footer-chip">Trusted by fleets</span>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row g-3">
                <div className="col-6 col-md-4">
                  <h6 className="text-dark mb-3">Product</h6>
                  <ul className="list-unstyled small text-muted mb-0">
                    <li><Link className="footer-link" to="/login">Dashboard</Link></li>
                    <li><Link className="footer-link" to="/register">Sign up</Link></li>
                    <li><Link className="footer-link" to="/">Status</Link></li>
                  </ul>
                </div>
                <div className="col-6 col-md-4">
                  <h6 className="text-dark mb-3">Support</h6>
                  <ul className="list-unstyled small text-muted mb-0">
                    <li><span className="footer-text">help@garagego.com</span></li>
                    <li><span className="footer-text">+1 (555) 123-4567</span></li>
                    <li><span className="footer-text">Knowledge base</span></li>
                  </ul>
                </div>
                <div className="col-12 col-md-4">
                  <h6 className="text-dark mb-3">Locations</h6>
                  <ul className="list-unstyled small text-muted mb-0">
                    <li><span className="footer-text">Downtown</span></li>
                    <li><span className="footer-text">Westside</span></li>
                    <li><span className="footer-text">Airport</span></li>
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
            <span>&copy; 2025 Garagego. All rights reserved.</span>
            <div className="d-flex gap-3">
              <span className="footer-text">Privacy</span>
              <span className="footer-text">Terms</span>
              <span className="footer-text">Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
