# 🚗 GarageGo - Vehicle Service Booking & Scheduling System

A complete full-stack web application for garage service booking and scheduling. Customers can book vehicle services online, admins manage bookings and services, and mechanics track their assigned work.

![Tech Stack](https://img.shields.io/badge/React-18.2.0-blue)
![Django](https://img.shields.io/badge/Django-5.0-green)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [User Roles](#user-roles)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### For Customers
- 🔐 User registration and authentication (JWT)
- 🚙 Vehicle management (Add, Edit, Delete)
- 📅 Service booking with date & time slot selection
- ⏰ Real-time availability checking (prevents double booking)
- 📊 View booking history and status
- 💳 Payment status tracking
- 🔔 Booking status updates (Pending → Approved → In Progress → Completed)

### For Admins
- 🛠️ Service management (CRUD operations)
- 📋 View all bookings with filtering options
- ✅ Approve/reject booking requests
- 👨‍🔧 Assign mechanics to approved bookings
- 💰 Update payment status (Paid/Unpaid)
- 📈 Complete booking management dashboard

### For Mechanics
- 🔧 View assigned bookings
- 📝 Update booking status
- 🎯 Track personal workload
- ✔️ Mark jobs as completed

### General Features
- 🎨 Professional landing page
- 📱 Fully responsive design (mobile-friendly)
- 🔒 Role-based access control
- 🚫 Double booking prevention
- 🎯 Clean and intuitive UI with Bootstrap
- ⚡ Fast and efficient API with Django REST Framework

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18.2 with Vite
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios
- **Styling:** Bootstrap 5.3
- **State Management:** React Hooks (useState, useEffect)

### Backend
- **Framework:** Django 5.0
- **API:** Django REST Framework 3.14
- **Authentication:** JWT (djangorestframework-simplejwt)
- **Database:** MySQL 8.0 (with mysqlclient)
- **CORS:** django-cors-headers

### Database Schema
- Custom User model with roles (Customer, Admin, Mechanic)
- Vehicle model (linked to customers)
- Service model (managed by admins)
- Booking model (with status tracking and mechanic assignment)

---

## 🏗️ System Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   React SPA     │  HTTP   │  Django REST    │  ORM    │     MySQL       │
│   (Frontend)    │ ──────> │     API         │ ──────> │   Database      │
│  Port: 3000     │  JSON   │  Port: 8000     │         │  Port: 3306     │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

**Key Components:**
- **Frontend:** Single Page Application (SPA) with protected routes
- **Backend:** RESTful API with JWT authentication
- **Database:** Relational database with foreign key relationships
- **Authentication:** Token-based (Access + Refresh tokens)

---

## 📦 Installation

### Prerequisites
- Python 3.8+ installed
- Node.js 16+ and npm installed
- MySQL 8.0+ installed and running
- Git installed

### 1. Clone Repository
```bash
git clone https://github.com/abbishanth09/GarageGo.git
cd GarageGo
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Create MySQL database
mysql -u root -p
CREATE DATABASE garage_booking_db CHARACTER SET utf8mb4;
EXIT;

# Update database credentials in settings.py if needed
# File: backend/garage_booking/settings.py
# Update: USER, PASSWORD, HOST

# Run migrations
python manage.py migrate

# Create test users (optional)
python manage.py shell -c "from api.models import User; User.objects.create_user(email='admin@test.com', username='Admin User', password='admin123', role='admin', is_staff=True, is_superuser=True); User.objects.create_user(email='customer@test.com', username='Customer User', password='customer123', role='customer'); User.objects.create_user(email='mechanic@test.com', username='Mechanic User', password='mechanic123', role='mechanic'); print('Users created!')"

# Start backend server
python manage.py runserver
```

Backend will run at: `http://localhost:8000`

### 3. Frontend Setup

```bash
# Open new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run at: `http://localhost:3000`

---

## 🚀 Usage

### Access the Application
1. Open browser: `http://localhost:3000`
2. You'll see the GarageGo landing page
3. Click **"Get Started"** or **"Login"**

### User Roles

1.  Admin    
2.  Customer 
3.  Mechanic 

### Typical Workflow

1. **Admin**: Login → Add Services (Oil Change, Brake Service, etc.)
2. **Customer**: Login → Add Vehicle → Select Service → Book Appointment
3. **Admin**: Approve Booking → Assign Mechanic → Update Payment Status
4. **Mechanic**: View Assigned Bookings → Update Status to "In Progress" → Mark as "Completed"
5. **Customer**: View booking status and history

---

## 👥 User Roles

### Customer
- Register and manage account
- Add/Edit/Delete vehicles
- Browse available services
- Create bookings with preferred date/time
- View booking history and status
- Cancel pending bookings

### Admin
- Manage services (Create, Edit, Delete)
- View all bookings with filters
- Approve/reject booking requests
- Assign mechanics to bookings
- Update payment status
- Full system oversight

### Mechanic
- View assigned bookings
- Update booking status
- Track workload
- Mark jobs as completed


## 📁 Project Structure

```
GarageGo/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── db.sqlite3 (auto-generated)
│   ├── garage_booking/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   └── api/
│       ├── __init__.py
│       ├── models.py           # User, Vehicle, Service, Booking models
│       ├── serializers.py      # DRF serializers
│       ├── auth_views.py       # Authentication endpoints
│       ├── vehicle_views.py    # Vehicle CRUD
│       ├── service_views.py    # Service CRUD
│       ├── booking_views.py    # Booking management
│       ├── urls.py             # API routes
│       ├── admin.py            # Django admin config
│       └── migrations/
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── VehicleList.jsx
│       │   ├── VehicleForm.jsx
│       │   ├── ServiceList.jsx
│       │   ├── ServiceForm.jsx
│       │   ├── BookingForm.jsx
│       │   └── BookingList.jsx
│       ├── pages/
│       │   ├── LandingPage.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── CustomerDashboard.jsx
│       │   ├── AdminDashboard.jsx
│       │   └── MechanicDashboard.jsx
│       ├── services/
│       │   └── apiService.js   # API calls
│       └── utils/
│           ├── api.js          # Axios instance
│           ├── helpers.js      # Helper functions
│           └── constants.js    # Constants
│
└── README.md
```

---

## 🎨 Screenshots

### Landing Page
Professional landing page with service highlights and call-to-action buttons.

### Customer Dashboard
- My Vehicles tab
- Create Booking tab
- My Bookings tab (with status tracking)
- Services tab

### Admin Dashboard
- All Bookings (with filters)
- Manage Services
- Approve bookings and assign mechanics
- Update payment status

### Mechanic Dashboard
- View assigned bookings
- Update job status

---

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with Django's built-in system
- Role-based access control (RBAC)
- CORS protection
- SQL injection prevention (Django ORM)
- XSS protection
- CSRF protection

---

## 🌟 Key Highlights

- ✅ **No Double Booking:** System prevents overlapping appointments
- ✅ **Real-time Slots:** Check available time slots before booking
- ✅ **Auto-generated Booking Numbers:** Format: BK00001, BK00002, etc.
- ✅ **UUID Primary Keys:** Secure and unique identifiers
- ✅ **Responsive Design:** Works on all devices
- ✅ **Clean Architecture:** Separation of concerns (Frontend/Backend)



## 🐛 Troubleshooting

### Common Issues

**1. Database Connection Error**
```
Solution: Check MySQL service is running and credentials in settings.py are correct
```

**2. JWT Token Expired**
```
Solution: Token auto-refreshes. If issue persists, logout and login again
```

**3. Port Already in Use**
```
Backend: Change port in runserver command: python manage.py runserver 8001
Frontend: Update port in vite.config.js
```

**4. CORS Error**
```
Solution: Ensure backend CORS settings include frontend URL (localhost:3000)
```

---

## 👨‍💻 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 Author

**Abbishanth**
- GitHub: [@abbishanth09](https://github.com/abbishanth09)
- Project: [GarageGo](https://github.com/abbishanth09/GarageGo)

---

## 🙏 Acknowledgments

- Django REST Framework team
- React and Vite teams
- Bootstrap team
- Open source community

---

## 📞 Contact & Support

For questions or support, please open an issue on GitHub or contact:
- Email: info@garagego.com
- GitHub Issues: [Create an issue](https://github.com/abbishanth09/GarageGo/issues)

---

**⭐ If you found this project helpful, please give it a star!**

---

Built with ❤️ using React, Django, and MySQL

