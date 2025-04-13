//Contributed by Jared Scott

//Imports
const router = require('express').Router();
const userCon = require('../controllers/userController');
const validation = require('../validation/user');
const { isAuthenticated } = require('../middleware/authenticate');

//GET all users
router.get('/', userCon.getAllUsers);

//GET user by ID
router.get('/:id', userCon.getUserById);

//POST user
router.post('/', isAuthenticated, validation, userCon.createUser);

//PUT user
router.put('/:id', isAuthenticated, validation, userCon.editUser);

//DELETE user
router.delete('/:id', isAuthenticated, userCon.deleteUser);

module.exports = router;
