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



---

## Day 17 Progress

- Connected the React Login page to the Express backend
- Sent login credentials to the authentication API using Axios
- Added frontend login validation
- Added login loading state
- Displayed backend login success messages
- Displayed backend authentication error messages
- Received JWT token after successful login
- Stored logged-in user information in browser localStorage
- Stored JWT authentication token in localStorage
- Added automatic navigation to Home after successful login
- Tested correct user login
- Tested incorrect password handling
- Tested unknown user login
- Verified saved authentication information using browser developer tools


---

## Day 18 Progress

- Created React AuthContext for global authentication state
- Wrapped the application with AuthProvider
- Connected frontend login to AuthContext
- Restored logged-in user information from localStorage
- Updated the Navbar based on authentication state
- Displayed the logged-in player's Player ID
- Added frontend Logout functionality
- Removed authentication information from localStorage during logout
- Added automatic navigation after logout
- Verified that login state remains after browser refresh
- Verified that logout state remains after browser refresh
- Added cyber-themed Player ID and Logout button styling

---

## Day 19 Progress

- Updated Axios configuration for authenticated API requests
- Added an Axios request interceptor
- Automatically retrieved the JWT token from localStorage
- Automatically added Bearer authentication tokens to API requests
- Created a reusable ProtectedRoute React component
- Protected the My Tickets frontend route
- Redirected unauthenticated users to the Login page
- Allowed authenticated users to access protected pages
- Tested My Tickets access while logged out
- Tested My Tickets access after successful login
- Prepared frontend authentication for future protected backend APIs


---

## Day 20 Progress

- Created the Tournament MongoDB model
- Added tournament title, game and description fields
- Added tournament date and ticket price fields
- Added total seat and available seat fields
- Added optional tournament image field
- Created the tournament backend controller
- Implemented the Get All Tournaments API
- Implemented the Create Tournament API
- Created tournament backend routes
- Connected tournament routes to the Express server
- Added automatic available-seat initialization
- Tested tournament creation using REST Client
- Created multiple sample tournament records
- Tested retrieval of tournament data
- Verified tournament records using MongoDB Compass


---

## Day 21 Progress

- Connected the React Tournaments page to the Express backend API
- Removed hard-coded frontend tournament data
- Retrieved tournament information using Axios
- Added React useEffect for automatic tournament loading
- Added tournament loading state
- Added tournament API error handling
- Added empty tournament handling
- Created the reusable TournamentCard component
- Displayed tournament data from MongoDB
- Displayed formatted tournament dates
- Displayed ticket prices and available seats
- Used MongoDB document IDs as React component keys
- Improved CyberArena navbar alignment
- Fixed Login button alignment
- Improved Home page hero alignment
- Improved feature card spacing and sizing
- Added responsive frontend layout
- Verified MongoDB → Express → React tournament data flow


---

## Day 22 Progress

- Created the Ticket MongoDB model
- Added references between tickets, users and tournaments
- Added unique ticket code generation
- Added ticket price and reservation status fields
- Created the ticket backend controller
- Implemented authenticated tournament ticket reservation
- Added tournament availability checking
- Added automatic available-seat reduction after reservation
- Prevented duplicate tournament reservations by the same user
- Created the authenticated My Tickets backend API
- Added tournament data population to ticket responses
- Created ticket backend routes
- Connected ticket routes to the Express server
- Protected ticket APIs using JWT authentication middleware
- Tested successful ticket reservation using REST Client
- Tested duplicate ticket reservation prevention
- Tested available-seat reduction
- Tested authenticated My Tickets retrieval
- Verified ticket records using MongoDB Compass



---

## Day 23 Progress

- Connected the React tournament reservation button to the backend API
- Used Axios to send authenticated ticket reservation requests
- Used the automatically attached JWT token for protected ticket APIs
- Redirected unauthenticated users to Login before reservation
- Added frontend ticket reservation loading state
- Displayed ticket reservation success messages
- Displayed backend reservation error messages
- Updated available tournament seats immediately after successful reservation
- Connected the My Tickets page to the backend API
- Removed hard-coded My Tickets sample data
- Retrieved logged-in user tickets from MongoDB
- Displayed tournament information inside each ticket
- Displayed ticket code, ticket price and reservation status
- Added loading, error and empty states to My Tickets
- Tested successful frontend ticket reservation
- Tested duplicate ticket reservation prevention
- Tested authenticated My Tickets retrieval
- Verified ticket records and seat changes in MongoDB



---

## Day 24 Progress

- Implemented ticket cancellation in the backend
- Added authenticated ticket cancellation API
- Verified that users can only cancel their own tickets
- Added ticket ID validation
- Prevented duplicate ticket cancellation
- Updated ticket status from RESERVED to CANCELLED
- Automatically returned cancelled seats to tournament availability
- Added ticket cancellation route
- Connected the My Tickets page to the cancellation API
- Added ticket cancellation confirmation
- Added cancellation loading state
- Added cancellation success and error messages
- Added cancelled ticket styling
- Removed the cancellation button from already cancelled tickets
- Tested tournament seat restoration after cancellation
- Verified cancelled ticket records using MongoDB Compass
- Verified that cancelled tournament tickets can be reserved again



---

## Day 25 Progress

- Added player points to the User MongoDB model
- Added player wins to the User MongoDB model
- Added default leaderboard statistics for new users
- Created the leaderboard backend controller
- Implemented the Get Leaderboard API
- Sorted leaderboard players by points and wins
- Added automatic player ranking numbers
- Limited leaderboard results to the top 20 players
- Prevented passwords and emails from being exposed in leaderboard responses
- Created leaderboard backend routes
- Connected leaderboard routes to the Express server
- Tested leaderboard retrieval using REST Client
- Added test player statistics using MongoDB Compass
- Verified automatic leaderboard sorting
- Verified new users receive default points and wins


---

## Day 26 Progress

- Connected the React Leaderboard page to the backend API
- Removed hard-coded leaderboard player data
- Retrieved real player rankings using Axios
- Added React useEffect for automatic leaderboard loading
- Added leaderboard loading state
- Added leaderboard API error handling
- Added empty leaderboard handling
- Displayed player names from MongoDB
- Displayed unique Player IDs
- Displayed real player points and wins
- Displayed automatic ranking numbers from the backend
- Updated leaderboard table to support five columns
- Added responsive leaderboard styling
- Verified leaderboard changes when MongoDB player statistics were updated
- Successfully completed MongoDB → Express → React leaderboard data flow


---

## Day 27 Progress

- Created the SupportMessage MongoDB model
- Added support name, email and message fields
- Added OPEN and RESOLVED support status values
- Created the support backend controller
- Implemented the support message submission API
- Added backend support form validation
- Created support backend routes
- Connected support routes to the Express server
- Tested support submission using REST Client
- Verified support records using MongoDB Compass
- Connected the React Support page to the backend API
- Sent support messages using Axios
- Added frontend support loading state
- Added frontend success and error messages
- Cleared the Support form after successful submission
- Tested frontend and backend validation
- Successfully completed React → Express → MongoDB support message flow



---

## Day 28 Progress

- Created the React Player Profile page
- Connected the Profile page to the protected current-user API
- Retrieved logged-in user information using Axios
- Automatically sent the JWT token using the Axios interceptor
- Displayed the player's name
- Displayed the player's email
- Displayed the unique Player ID
- Displayed the player's account creation date
- Added profile loading state
- Added profile API error handling
- Protected the Profile route using ProtectedRoute
- Added Profile navigation for authenticated users
- Added cyber-themed Player Profile styling
- Verified that Profile remains accessible after browser refresh
- Verified that logged-out users are redirected to Login
- Verified that passwords are not exposed in Profile responses

---

## Day 29 Progress

- Extended the current-user API with real player statistics
- Added player points to the authenticated profile response
- Added player wins to the authenticated profile response
- Added total ticket counting for the logged-in user
- Added active reserved ticket counting
- Added cancelled ticket counting
- Used MongoDB ticket data to generate real profile statistics
- Updated the React Player Profile page
- Added player points and wins to the Profile interface
- Added total ticket statistics
- Added active reservation statistics
- Added cancelled ticket statistics
- Created responsive Profile statistics cards
- Verified Profile statistics using MongoDB data
- Verified statistics update after ticket cancellation
- Maintained JWT protection for the Player Profile



---

## Day 30 Progress

- Created a custom CyberArena 404 Not Found page
- Added wildcard routing for invalid URLs
- Added a Back to Home navigation option
- Added responsive 404 page styling
- Verified all existing React routes
- Verified protected Profile routing
- Verified protected My Tickets routing
- Tested invalid URL handling
- Tested browser refresh on application routes
- Checked major pages for console errors
- Checked responsive layouts on desktop, tablet, and mobile views
- Improved overall application navigation and error handling

---

## Day 31 Progress

- Added PLAYER and ADMIN roles to the User MongoDB model
- Added PLAYER as the default role for new accounts
- Updated registration responses with user roles
- Updated login responses with user roles
- Added roles to the current authenticated user API
- Updated JWT authentication middleware
- Created ADMIN-only authorization middleware
- Created an Admin backend controller
- Created protected Admin API routes
- Connected Admin routes to the Express server
- Created an administrator account using MongoDB Compass
- Tested Admin authentication using JWT
- Verified ADMIN users can access protected Admin APIs
- Verified PLAYER users receive 403 Forbidden
- Verified unauthenticated users receive 401 Unauthorized
- Established the backend security foundation for the CyberArena Admin system



---

## Day 32 Progress

- Created the CyberArena Admin Dashboard
- Created a frontend AdminRoute component
- Restricted the Admin Dashboard to ADMIN users
- Added an Admin navigation link for administrators
- Implemented Admin tournament creation
- Implemented Admin tournament editing
- Implemented Admin tournament deletion
- Added backend ADMIN protection to tournament management routes
- Removed public tournament creation access
- Added tournament form validation
- Preserved reserved seat counts when tournament capacity is updated
- Prevented deletion of tournaments that contain ticket records
- Connected Admin Dashboard forms to the Express backend using Axios
- Added success and error handling for Admin actions
- Added responsive Admin Dashboard styling
- Verified PLAYER users cannot access Admin functionality
- Verified created and updated tournaments appear on the public Tournaments page
- Completed protected Admin tournament CRUD functionality

---

## Day 33 Progress

- Created Admin Support Management functionality
- Added ADMIN-only support message retrieval
- Added support status update API
- Added OPEN and RESOLVED support message states
- Added backend support status validation
- Protected Admin Support APIs using JWT authentication
- Protected Admin Support APIs using ADMIN authorization
- Created the Admin Support Inbox page
- Connected Admin Support Inbox to MongoDB data
- Added total, open and resolved support statistics
- Added ALL, OPEN and RESOLVED message filters
- Added Mark Resolved functionality
- Added Reopen Message functionality
- Added support submission timestamps
- Added loading, success and error handling
- Added responsive Admin Support styling
- Added Admin Inbox navigation
- Verified PLAYER users cannot access Admin Support functionality
- Completed the Admin Support Management system



---

## Day 34 Progress

- Added tournament search functionality
- Added tournament search by title
- Added tournament search by game
- Added tournament search by description
- Added dynamic tournament game filtering
- Added automatic unique game filter options
- Added tournament result count
- Added Clear Filters functionality
- Added tournament empty search state
- Preserved authenticated ticket reservation functionality
- Added My Tickets reservation statistics
- Added total ticket counter
- Added reserved ticket counter
- Added cancelled ticket counter
- Added ALL ticket filter
- Added RESERVED ticket filter
- Added CANCELLED ticket filter
- Preserved ticket cancellation functionality
- Added automatic ticket counter updates after cancellation
- Added responsive tournament filtering controls
- Added responsive ticket filter controls
- Improved CyberArena frontend usability and event discovery

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