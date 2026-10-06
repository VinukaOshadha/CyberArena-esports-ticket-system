# CyberArena

CyberArena is a full-stack eSports tournament ticket reservation web application developed using the MERN stack.

---

## Day 1 Progress

- Initialized the React project using Vite
- Installed frontend dependencies
- Created the first CyberArena home page
- Added basic CyberArena styling
- Successfully ran the frontend in Google Chrome
- Initialized Git and connected the project to GitHub

---

## Day 2 Progress

- Installed React Router
- Created the main navigation bar
- Created reusable page structure
- Added Home page route
- Added Tournaments route
- Added Leaderboard route
- Added Support route
- Added Login route
- Tested navigation between pages

---

## Day 3 Progress

- Improved the CyberArena home page
- Created the hero section
- Created reusable FeatureCard component
- Added tournament navigation button
- Added feature cards for tournaments, tickets and leaderboard
- Added hover effects
- Added responsive home page styling

---

## Day 4 Progress

- Created Login interface
- Created Registration interface
- Added email and password fields
- Added player name field
- Added navigation between Login and Register pages
- Added cyber-themed authentication styling

---

## Day 5 Progress

- Created reusable TournamentCard component
- Developed Tournaments page
- Added sample tournament data
- Displayed game, date, price and available seats
- Added Reserve Ticket buttons
- Added tournament card styling

---

## Day 6 Progress

- Created My Tickets page
- Added sample ticket data
- Displayed tournament details
- Displayed ticket ID
- Displayed ticket status
- Added My Tickets navigation route
- Added ticket card styling

---

## Day 7 Progress

- Developed the Leaderboard page
- Added sample player ranking data
- Displayed player rank
- Displayed points and wins
- Used React map function to display player records
- Added cyber-themed leaderboard table styling

---

## Day 8 Progress

- Developed the Support page
- Created contact form
- Added name field
- Added email field
- Added message field
- Added React state handling
- Added support page styling

---

## Day 9 Progress

- Added frontend form validation
- Added Login validation
- Added Registration validation
- Added password confirmation
- Added Support form validation
- Added success messages
- Added error messages
- Improved user feedback before backend integration

---

---

## Day 10 Progress

- Created the backend project folder
- Initialized Node.js using npm
- Installed Express.js
- Installed CORS middleware
- Installed dotenv for environment configuration
- Installed nodemon for development
- Created the main Express server
- Configured backend server port using environment variables
- Created a backend health-check API
- Successfully tested the backend using Google Chrome



---

## Day 11 Progress

- Installed Mongoose for MongoDB integration
- Created the MongoDB database configuration file
- Added MongoDB connection URI using environment variables
- Connected the Express backend to MongoDB
- Added MongoDB connection error handling
- Updated the backend server to initialize the database connection
- Successfully tested the MongoDB connection
- Verified the CyberArena backend health-check API


---

## Day 12 Progress

- Installed bcryptjs for secure password handling
- Created the MongoDB models folder
- Created the User Mongoose model
- Added player name field
- Added unique user email field
- Added password field with minimum length validation
- Added unique Player ID field
- Added automatic createdAt and updatedAt timestamps
- Implemented automatic password hashing before saving users
- Added password comparison method for future login authentication
- Verified that the backend still runs successfully



---

## Day 13 Progress

- Created the backend controllers folder
- Created the authentication controller
- Implemented the user registration API
- Added registration input validation
- Added password length validation
- Added duplicate email checking
- Added automatic unique Player ID generation
- Created the authentication routes
- Connected authentication routes to the Express server
- Successfully registered users into MongoDB
- Verified encrypted password storage using bcrypt
- Tested duplicate user registration protection
- Created a REST Client test request for the registration API




---

## Day 14 Progress

- Installed jsonwebtoken for JWT authentication
- Added JWT secret configuration using environment variables
- Implemented the user login API
- Added email and password validation
- Added registered-user lookup using MongoDB
- Added secure password verification using bcrypt
- Generated JWT tokens after successful login
- Added the authentication login route
- Tested successful user login using REST Client
- Tested incorrect password handling
- Tested unknown user login handling
- Verified successful authentication response with user information and JWT token


---

## Day 15 Progress

- Created the backend authentication middleware
- Added JWT token verification
- Added Bearer token handling
- Added protected route authentication
- Retrieved logged-in users using JWT user IDs
- Prevented passwords from being returned in protected responses
- Created the current-user API endpoint
- Added the protected `/api/auth/me` route
- Tested authenticated user retrieval using REST Client
- Tested requests without authentication tokens
- Tested invalid JWT token handling
- Verified protected backend route security


---

## Day 16 Progress

- Installed Axios for frontend API communication
- Created a reusable frontend Axios API configuration
- Connected the React Registration page to the Express backend
- Sent registration data from React to the backend API
- Added frontend loading state during registration
- Displayed backend registration success messages
- Displayed backend registration error messages
- Tested successful user registration from the frontend
- Tested duplicate email registration from the frontend
- Verified newly registered users in MongoDB
- Added automatic navigation to Login after successful registration




## Planned Technologies

- React
- Vite
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Axios

---

## Planned Features

- User Registration
- User Login
- Tournament Viewing
- Ticket Reservation
- My Tickets
- Ticket Cancellation
- Player Leaderboard
- Support System
- User Authentication
- MongoDB Database Integration

---

## Current Development Status

Frontend interface development is in progress.

The next development phase will focus on creating the Node.js and Express backend and connecting the application to MongoDB.