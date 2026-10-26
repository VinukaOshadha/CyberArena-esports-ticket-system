# 🎮 CyberArena

## eSports Tournament Ticket Reservation System

CyberArena is a full-stack web application developed for managing eSports tournaments and ticket reservations.

The system allows players to discover tournaments, create accounts, securely login, reserve tournament tickets, cancel reservations, view their ticket history, monitor leaderboard rankings, submit support requests and manage their player profiles.

Administrators are provided with protected management functionality for tournaments and player support requests.

---

## Project Objectives

The main objectives of CyberArena are to:

- provide an easy way to discover eSports tournaments
- allow players to reserve tournament tickets online
- securely manage player authentication
- prevent duplicate ticket reservations
- automatically manage tournament seat availability
- provide player ticket-history management
- provide an eSports leaderboard
- provide player support functionality
- provide secure administrator management features
- demonstrate a complete MERN full-stack web application

---

# Main Features

## Player Features

- Player registration
- Secure login
- JWT authentication
- Player profile
- Player ID generation
- Tournament browsing
- Tournament searching
- Tournament game filtering
- Ticket reservation
- Duplicate reservation prevention
- My Tickets page
- Ticket status filtering
- Ticket cancellation
- Automatic seat restoration
- Leaderboard
- Support request submission
- Responsive user interface
- Protected user routes
- Automatic invalid-session cleanup

## Admin Features

- ADMIN role authorization
- Protected Admin Dashboard
- Tournament creation
- Tournament editing
- Tournament deletion
- Tournament capacity management
- Reservation-history protection
- Admin Support Inbox
- View support messages
- OPEN support-message filtering
- RESOLVED support-message filtering
- Mark support request as resolved
- Reopen support request

---

# Technology Stack

## Frontend

- React
- Vite
- React Router
- Axios
- JavaScript
- CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Helmet
- CORS
- dotenv

## Development Tools

- Visual Studio Code
- MongoDB Compass
- Git
- GitHub
- REST Client

---

# System Architecture

```text
            USER / ADMIN
                 │
                 ▼
        React + Vite Frontend
                 │
              Axios
                 │
                 ▼
        Express REST API
                 │
        ┌────────┴────────┐
        │                 │
 Authentication       Business Logic
   JWT / bcrypt       Tickets / Admin
        │                 │
        └────────┬────────┘
                 │
              Mongoose
                 │
                 ▼
              MongoDB
```

---

# Project Structure

```text
CyberArena-esports-ticket-system/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── tournamentController.js
│   │   ├── ticketController.js
│   │   ├── leaderboardController.js
│   │   ├── supportController.js
│   │   └── adminController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Tournament.js
│   │   ├── Ticket.js
│   │   └── SupportMessage.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── tournamentRoutes.js
│   │   ├── ticketRoutes.js
│   │   ├── leaderboardRoutes.js
│   │   ├── supportRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── frontend/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   └── TournamentCard.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Tournaments.jsx
│   │   │   ├── MyTickets.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── Support.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminSupport.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── docs/
│   ├── SETUP.md
│   └── API.md
│
├── .gitignore
└── README.md
```

---

# Database

CyberArena uses MongoDB.

Default local database:

```text
cyberarena
```

Main collections:

```text
users
tournaments
tickets
supportmessages
```

Relationships are handled using MongoDB ObjectId references between users, tournaments and tickets.

---

# Authentication

CyberArena uses JSON Web Tokens for authentication.

After successful login:

```text
User credentials
      ↓
Backend verification
      ↓
JWT generated
      ↓
Frontend stores authenticated session
      ↓
JWT attached to protected API requests
```

Passwords are hashed using bcrypt before being saved to MongoDB.

---

# User Roles

CyberArena currently supports two roles:

```text
PLAYER
ADMIN
```

### PLAYER

Can:

- reserve tickets
- view own tickets
- cancel own tickets
- access profile
- view tournaments
- view leaderboard
- submit support requests

### ADMIN

Can perform Player functionality and also:

- access Admin Dashboard
- create tournaments
- edit tournaments
- delete eligible tournaments
- access Admin Support Inbox
- manage support-message status

Backend authorization protects Admin APIs even if someone attempts to manually access them.

---

# Ticket Reservation Flow

```text
Player
  ↓
Select Tournament
  ↓
Reserve Ticket
  ↓
JWT Authentication
  ↓
Duplicate Check
  ↓
Available Seat Check
  ↓
Ticket Created
  ↓
Available Seats - 1
  ↓
Ticket appears in My Tickets
```

When a ticket is cancelled:

```text
RESERVED
   ↓
CANCELLED
   ↓
Available Seats + 1
```

---

# Support Flow

```text
Player / Visitor
       ↓
Submit Support Request
       ↓
MongoDB
       ↓
Status = OPEN
       ↓
Admin Support Inbox
       ↓
Admin marks RESOLVED
```

Administrators may reopen resolved support requests when necessary.

---

# Security

CyberArena includes several security measures:

- bcrypt password hashing
- JWT authentication
- role-based authorization
- protected React routes
- protected Express routes
- ADMIN-only backend middleware
- Helmet security headers
- restricted CORS configuration
- environment-variable protection
- JSON request-size limiting
- automatic expired-session cleanup
- duplicate reservation prevention
- ticket ownership validation
- tournament-history protection

Sensitive `.env` information and real JWT tokens are excluded from the repository.

---

# API

The backend API runs at:

```text
http://localhost:5000/api
```

Main API groups:

```text
/api/auth
/api/tournaments
/api/tickets
/api/leaderboard
/api/support
/api/admin
```

Complete API documentation:

```text
docs/API.md
```

---

# Installation

Detailed setup instructions are available in:

```text
docs/SETUP.md
```

Basic startup:

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# Environment Variables

Backend environment variables:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/cyberarena
JWT_SECRET=your_secure_jwt_secret
FRONTEND_URL=http://localhost:5173
```

Never commit the real `.env` file.

---

# Responsive Design

CyberArena is designed for:

- desktop
- laptop
- tablet
- mobile

The interface uses a CyberArena-inspired neon-green gaming design with responsive cards, forms, navigation, tournament grids and administration interfaces.

---

# Error Handling

The application includes handling for:

- invalid login
- duplicate registration
- missing authentication
- unauthorized Admin access
- invalid JWT
- duplicate reservations
- sold-out tournaments
- invalid ticket cancellation
- invalid tournament IDs
- invalid support-message IDs
- missing API routes
- application 404 pages
- server errors

---

# Testing

The project has been manually tested for:

- registration
- authentication
- logout
- protected routes
- Admin authorization
- tournament CRUD
- tournament search
- tournament filtering
- ticket reservation
- duplicate reservation protection
- ticket cancellation
- seat restoration
- leaderboard loading
- support submission
- Admin Support management
- player profile statistics
- direct URL access
- page refresh
- invalid routes
- mobile responsiveness
- browser console errors
- API network responses

---

# Documentation

- Setup Guide — `docs/SETUP.md`
- API Documentation — `docs/API.md`

---

# Project Status

```text
Core Development      ✅ Complete
Authentication        ✅ Complete
Tournament System     ✅ Complete
Ticket System         ✅ Complete
Leaderboard           ✅ Complete
Support System        ✅ Complete
Admin System          ✅ Complete
Search & Filters      ✅ Complete
Security Cleanup      ✅ Complete
System Testing        ✅ Complete
Documentation         ✅ Complete
Final Demo Preparation ⏳
```

---

# Academic Project

CyberArena was developed as a full-stack web development project demonstrating practical use of the MERN stack, REST APIs, authentication, authorization, database relationships and responsive frontend development.

---

# Developer

**Vinuka Oshadha**

GitHub:

```text
VinukaOshadha
```

Repository:

```text
CyberArena-esports-ticket-system
```

---

# License

This project was developed for academic and educational purposes.