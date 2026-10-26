# CyberArena Setup Guide

This guide explains how to install and run the CyberArena eSports Tournament Ticket Reservation System locally.

## 1. Requirements

Install the following software before running the project:

- Node.js
- npm
- MongoDB
- MongoDB Compass
- Visual Studio Code
- Git

## 2. Clone the Repository

```bash
git clone https://github.com/VinukaOshadha/CyberArena-esports-ticket-system.git
```

Open the project folder:

```bash
cd CyberArena-esports-ticket-system
```

## 3. Backend Installation

Open a terminal and move to the backend folder:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

## 4. Backend Environment Variables

Create a file named:

```text
.env
```

inside the `backend` folder.

Add:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/cyberarena
JWT_SECRET=your_secure_jwt_secret
FRONTEND_URL=http://localhost:5173
```

Do not upload the `.env` file to GitHub.

The repository includes `.env.example` to show the required environment variables without exposing private secrets.

## 5. MongoDB

Start MongoDB locally.

The default connection used by CyberArena is:

```text
mongodb://127.0.0.1:27017
```

The database name is:

```text
cyberarena
```

MongoDB creates the required collections automatically when data is added.

Important collections include:

- users
- tournaments
- tickets
- supportmessages

## 6. Start Backend Server

Inside the backend directory run:

```bash
npm run dev
```

The backend should run on:

```text
http://localhost:5000
```

Health endpoint:

```text
http://localhost:5000/api/health
```

A successful response should indicate that the CyberArena backend is healthy.

## 7. Frontend Installation

Open another terminal from the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The React application should run on:

```text
http://localhost:5173
```

## 8. Creating a Player Account

Open:

```text
http://localhost:5173/register
```

Enter:

- Name
- Email address
- Password

New accounts are created with the default role:

```text
PLAYER
```

Passwords are hashed before being stored in MongoDB.

## 9. Creating an Administrator for Local Testing

First register a normal user through the website.

Then open MongoDB Compass:

```text
cyberarena
→ users
```

Find the required user and change:

```json
"role": "PLAYER"
```

to:

```json
"role": "ADMIN"
```

Save the document.

Logout from CyberArena and login again so the new role is included in the authentication session.

The administrator can then access:

```text
/admin
/admin/support
```

## 10. Running the Complete Application

Two terminals should normally remain running.

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

## 11. Common Problems

### MongoDB connection error

Confirm MongoDB is running and verify:

```env
MONGO_URI=mongodb://127.0.0.1:27017/cyberarena
```

### Port 5000 already in use

Close the existing backend process or change the backend port.

### Frontend cannot contact backend

Confirm the backend is running on:

```text
http://localhost:5000
```

and confirm:

```env
FRONTEND_URL=http://localhost:5173
```

### Admin page redirects to Home

Confirm that the user's MongoDB document contains:

```json
"role": "ADMIN"
```

Then logout and login again.

### Protected page redirects to Login

The user must be authenticated before accessing protected pages such as:

```text
/my-tickets
/profile
```

## 12. Security Notes

CyberArena includes:

- bcrypt password hashing
- JWT authentication
- PLAYER and ADMIN role authorization
- protected backend routes
- protected frontend routes
- Helmet security headers
- CORS restrictions
- request body size limits
- environment variables for sensitive configuration
- automatic removal of invalid authentication sessions

Real passwords, JWT tokens and secret keys should never be committed to GitHub.