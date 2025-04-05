// server.js

// Imports
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/connection'); // Assuming you have this file
const routes = require('./routes'); // Imports the index.js from your routes folder

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

// Sync Sequelize models to the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
  });
});
