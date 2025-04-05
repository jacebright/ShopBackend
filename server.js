const express = require('express');
const app = express();
const port = 3000;

// Basic route for the welcome message with a link to redirect to /api-docs
app.get('/', (req, res) => {
  res.send(`
    Welcome to Shop Backend! <br>
    <a href="/api-docs">Go to API Docs</a>
  `);
});

// Redirect to /api-docs (Swagger)
app.get('/api-docs', (req, res) => {
  const swaggerUrl = process.env.SWAGGER_URL || 'http://localhost:3000/api-docs'; // Default to local if SWAGGER_URL is not set
  res.redirect(swaggerUrl);
});

// **My Contribution: Basic server setup with routes for welcome message and API redirect**
// - Pablo Zabaleta

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
