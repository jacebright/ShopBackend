// server.js

// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongodb = require('./db/database'); // Your MongoDB connection setup
const routes = require('./routes'); // Your API routes

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// API Routes
app.use(routes);

// Error handling middleware (optional, customize as needed)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Connect to MongoDB and start the server
mongodb.connect((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the process if connection fails
  } else {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}! Connected to MongoDB.`);
    });
  }
});
