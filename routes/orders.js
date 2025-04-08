//Contributed by Jared Scott

//Imports
const router = require('express').Router();
const orderCon = require('../controllers/orderController');
// order
//GET all Orders
router.get('/', orderCon.getAllOrders);
/* This route should be protected for admins only */

//GET order by ID
router.get('/:id', orderCon.getOrderById);

//POST order
router.post('/', orderCon.createOrder);

//PUT order
router.put('/:id', orderCon.editOrder);

//DELETE order
router.delete('/:id', orderCon.deleteOrder);

module.exports = router;
