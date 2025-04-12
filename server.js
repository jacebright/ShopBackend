// server.js

// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongodb = require('./db/database'); // Your MongoDB connection setup
const routes = require('./routes'); // Your API routes
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Initializing and incorporating Passport for OAuth
app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Controll-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
  })


// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Passport middleware applied throughout
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
))

passport.serializeUser((user, done) => {
  done(null, user);
})
passport.deserializeUser((user, done) => {
  done(null, user);
})

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")})

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
})

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
