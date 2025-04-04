//Contributed by Jared Scott

//Imports
const router = require('express').Router();
const userRoute = require('./users');
const productRoute = require('./products');
const cartRoute = require('./cart');
const orderRoute = require('./orders');

//All /users routes
router.use('/users', userRoute);

//All /product routes
router.use('/product', productRoute);

//All /cart routes
router.use('/cart', cartRoute);

//All /order routes
router.use('/order', orderRoute);

module.exports = router;