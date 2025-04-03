//Imports
const router = require('express').Router();
const userCon = require('../controllers/productController');

//GET inventory
router.get('/', userCon.getInventory);

//GET product by ID
router.get('/:id', userCon.getProductById);

//POST new product
router.post('/', userCon.addProduct);

//PUT product
router.put('/:id', userCon.editProduct);

//DELETE product
router.delete('/:id', userCon.deleteProduct);

module.exports = router;