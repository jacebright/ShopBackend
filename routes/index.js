//Contributed by Jared Scott

//Imports
const router = require('express').Router();
const userRoute = require('./users');
const productRoute = require('./products');
const cartRoute = require('./cart');
const orderRoute = require('./orders');
const swaggerRoute = require('./swagger');
const passport = require('passport');

//Swagger routes, needed for swagger ui
router.use('/', swaggerRoute);

//All /users routes
router.use(
  '/users',
  userRoute
  /*
        #swagger.tags = ['Users']
        #swagger.responses[400] = {
            ifStatusPresent: true,
            schema: {$ref: '#/definitions/Errors'}
        }
        #swagger.responses[401] = {
            ifStatusPresent: true,
            description: 'Unauthorized. Authentication required.'
        }
        #swagger.responses[404] = {
            ifStatusPresent: true,
            schema: {$ref: '#/definitions/NotFound'}
        }
        #swagger.responses[500] = {
            description: 'Server Error',
            schema: {$ref: '#/definitions/Error'}
        }
    */
);

//All /product routes
router.use(
  '/product',
  productRoute
  /*
        #swagger.tags = ['Product']
        #swagger.responses[400] = {
            ifStatusPresent: true,
            schema: {$ref: '#/definitions/Errors'}
        }
        #swagger.responses[401] = {
            ifStatusPresent: true,
            description: 'Unauthorized. Authentication required.'
        }
        #swagger.responses[404] = {
            ifStatusPresent: true,
            schema: {$ref: '#/definitions/NotFound'}
        }
        #swagger.responses[500] = {
            description: 'Server Error',
            schema: {$ref: '#/definitions/Error'}
        }
    */
);

//All /cart routes
router.use(
  '/cart',
  cartRoute
  /*
        #swagger.tags = ['Cart']
        #swagger.responses[400] = {
            ifStatusPresent: true,
            schema: {$ref: '#/definitions/Errors'}
        }
        #swagger.responses[401] = {
            ifStatusPresent: true,
            description: 'Unauthorized. Authentication required.'
        }
        #swagger.responses[404] = {
            ifStatusPresent: true,
            schema: {$ref: '#/definitions/NotFound'}
        }
        #swagger.responses[500] = {
            description: 'Server Error',
            schema: {$ref: '#/definitions/Error'}
        }
    */
);

//All /order routes
router.use(
  '/order',
  orderRoute
  /*
        #swagger.tags = ['Order']
        #swagger.responses[400] = {
            ifStatusPresent: true,
            schema: {$ref: '#/definitions/Errors'}
        }
        #swagger.responses[401] = {
            ifStatusPresent: true,
            description: 'Unauthorized. Authentication required.'
        }
        #swagger.responses[404] = {
            ifStatusPresent: true,
            schema: {$ref: '#/definitions/NotFound'}
        }
        #swagger.responses[500] = {
            description: 'Server Error',
            schema: {$ref: '#/definitions/Error'}
        }
    */
);

// Authentication routes 
// Contributed by Jace Bright
router.use('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) {
    req.logout(function(err) {
        if (err) {return next(err); }
        res.redirect('/');
    })
})

module.exports = router;
