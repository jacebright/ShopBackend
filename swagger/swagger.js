const swaggerAutogen = require('swagger-autogen');
const config = require('../config/config.js');

const doc = {
    info: {
        title: "Shop Backend API",
        description: "API for CSE341 shop backend group project"
    },
    host: config.swagger.host,
    schemes: [config.swagger.scheme],
    definitions: {}
}

const outputFile = "./swagger.json";
const routes = ["../routes/index.js"];

swaggerAutogen(outputFile, routes, doc);