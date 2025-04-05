// configuration/db.js (or database.js)
const { MongoClient } = require('mongodb');
require('dotenv').config();

let _db;

const connectToServer = (callback) => {
  if (_db) {
    console.log('MongoDB is already connected.');
    return callback(null, _db);
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return callback(new Error('MONGODB_URI is not defined in the .env file.'));
  }

  const client = new MongoClient(uri);

  client.connect()
    .then(connectedClient => {
      _db = connectedClient.db();
      console.log('Successfully connected to MongoDB.');
      return callback(null, _db);
    })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err);
      return callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Database not initialized');
  }
  return _db;
};

module.exports = { connectToServer, getDb };