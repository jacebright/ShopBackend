//Contributed by Jared Scott

//Imports
const router = require('express').Router();
const userCon = require('../controllers/userController');

//GET all users
router.get('/', userCon.getAllUsers);

//GET user by ID
router.get('/:id', userCon.getUserById);

//POST user
router.post('/', userCon.createUser);

//PUT user
router.put('/:id', userCon.editUser);

//DELETE user
router.delete('/:id', userCon.deleteUser);

module.exports = router;
