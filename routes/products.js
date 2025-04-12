//Contributed by Jared Scott

//Imports
const router = require('express').Router();
const userCon = require('../controllers/productController');
const validation = require('../validation/Item');

//GET inventory
router.get('/', userCon.getInventory);

//GET product by ID
router.get('/:id', userCon.getProductById);

//POST new product
router.post('/',validation, userCon.addProduct);

//PUT product
router.put('/:id',validation, userCon.editProduct);

//DELETE product
router.delete('/:id', userCon.deleteProduct);

module.exports = router;
