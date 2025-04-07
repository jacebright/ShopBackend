//Contributed by Jared Scott

//Imports
const router = require('express').Router();
const cartCon = require('../controllers/cartController');

//GET all carts
router.get('/', cartCon.getAllCarts);
/* This route should be protected for admins only */

//GET cart by ID
router.get('/:id', cartCon.getCartByUserId);
// User id should be determined and used to call specific cart.
// I have not implemented this yet.

//POST cart
router.post('/', cartCon.createCart);

//PUT cart
router.put('/:id', cartCon.editCart);

//DELETE cart
router.delete('/:id', cartCon.deleteCart);

module.exports = router;
