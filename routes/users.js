//Contributed by Jared Scott

//Imports
const router = require('express').Router();
const userCon = require('../controllers/userController');
const validation = require('../validation/user');

//GET all users
router.get('/', userCon.getAllUsers);

//GET user by ID
router.get('/:id', userCon.getUserById);

//POST user
router.post('/',validation, userCon.createUser);

//PUT user
router.put('/:id', userCon.editUser);

//DELETE user
router.delete('/:id', userCon.deleteUser);

module.exports = router;