const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');


// Load environment variables
dotenv.config();


// Create Express application
const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Main test route
app.get('/', (req, res) => {
  res.send('CyberArena Backend API is running');
});


// Health check API
app.get('/api/health', (req, res) => {

  res.status(200).json({
    success: true,
    message: 'CyberArena API is working'
  });

});


// Server port
const PORT = process.env.PORT || 5000;


// Start server
app.listen(PORT, () => {

  console.log(
    `CyberArena server running on port ${PORT}`
  );

});