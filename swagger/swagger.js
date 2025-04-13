require('dotenv').config();
const swaggerAutogen = require('swagger-autogen');
const config = require('../config/config.js');

const doc = {
  info: {
    title: 'Shop Backend API',
    description: 'API for CSE341 shop backend group project',
  },
  host: config.swagger.host,
  schemes: [config.swagger.scheme],
  definitions: {
    User: {
      firstName: 'any',
      lastName: 'any',
      email: 'any',
      favoriteColor: 'any',
      accountType: 'any',
      dateCreated: 'any',
      dateUpdated: 'any',
      cartId: 'any',
    },
    NewUserExample: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      favoriteColor: 'blue',
      accountType: 'premium',
      dateCreated: '04/12/2025',
      dateUpdated: '04/12/2025',
      cartId: '67f98c74ca78ef6c68ed10cf',
    },
    UpdateUserExample: {
      firstName: 'Larry',
    },
    Users: [{ $ref: '#/definitions/User' }],
    Product: {
      productId: 'any',
      productPrice: 'any',
      productName: 'any',
    },
    NewProductExample: {
      productId: '67f98c74ca78ef6c68ed10cf',
      productPrice: 19.99,
      productName: 'Sample Product',
    },
    UpdateProductExample: {
      productPrice: 24.99,
    },
    Products: [{ $ref: '#/definitions/Product' }],
    Cart: {
      products: 'any',
      userId: 'any',
      cartTotal: 'any',
    },
    NewCartExample: {
      products: [
        {
          productId: '67f98c74ca78ef6c68ed10cf',
        },
      ],
      userId: '67f98c74ca78ef6c68ed10cf',
      cartTotal: 59.97,
    },
    UpdateCartExample: {
      cartTotal: 79.99,
    },
    Carts: [{ $ref: '#/definitions/Cart' }],
    Order: {
      cartId: 'any',
      userId: 'any',
      dateCreated: 'any',
    },
    NewOrderExample: {
      cartId: '67f98c74ca78ef6c68ed10cf',
      userId: '67f98c74ca78ef6c68ed10cf',
      dateCreated: '04/12/2025',
    },
    UpdateOrderExample: {
      dateCreated: '04/12/2025',
    },
    Orders: [{ $ref: '#/definitions/Order' }],
    NotFound: {
      error: 'Resource not found.',
    },
    Error: {
      error: 'An error occurred.',
    },
    Errors: [{ $ref: '#/definitions/Error' }],
    Unauthorized: {
      error: 'Unauthorized. Failed to authenticate.',
    },
  },
};

const outputFile = './swagger.json';
const routes = ['../routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
