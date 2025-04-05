const config = {
    swagger: {
      scheme: process.env.SCHEME,
      host: process.env.HOST,
    },
    mongo: {
      connectionString: process.env.MONGO_CONNECTION_STRING,
    },
  };
  
  module.exports = config;