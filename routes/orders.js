//Contributed by Jared Scott

//Imports
const router = require('express').Router();
const orderCon = require('../controllers/orderController');
const validation = require('../validation/order');
const { isAuthenticated } = require('../middleware/authenticate')

// order
//GET all Orders
router.get('/', orderCon.getAllOrders);
/* This route should be protected for admins only */

//GET order by ID
router.get('/:id', orderCon.getOrderById);

//POST order
router.post('/', isAuthenticated, validation, orderCon.createOrder);

//PUT order
router.put('/:id', isAuthenticated, validation, orderCon.editOrder);

//DELETE order
router.delete('/:id', isAuthenticated, orderCon.deleteOrder);

module.exports = router;
