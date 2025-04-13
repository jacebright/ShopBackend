//Contributed by Jared Scott

//Imports
const router = require('express').Router();
const cartCon = require('../controllers/cartController');
const validation = require('../validation/cart');
const { isAuthenticated } = require('../middleware/authenticate');

//GET all carts
router.get('/', cartCon.getAllCarts);
/* This route should be protected for admins only */

//GET cart by ID
router.get('/:id', cartCon.getCartByUserId);
// User id should be determined and used to call specific cart.
// I have not implemented this yet. isAuthenticated, 

//POST cart
router.post('/', validation, cartCon.createCart);

//PUT cart
router.put('/:id', validation, cartCon.editCart);

//DELETE cart
router.delete('/:id', isAuthenticated, cartCon.deleteCart);

module.exports = router;
