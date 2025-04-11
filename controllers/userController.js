//Contributed by Jared Scott

// Imports
const mongodb = require('../db/database'); //Change as needed for database function location
const ObjectId = require('mongodb').ObjectId;

// Database collection name values
const collection_name = 'users';

//GET all users
const getAllUsers = async (req, res, next) => {
    /*
      #swagger.summary = 'Get All Users'
      #swagger.description = 'Get all users in the database'
      #swagger.responses[200] = {
        description: 'List of all users',
        schema: { $ref: '#/definitions/Users'}
      }
     */
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection(collection_name)
      .find();
    result.toArray().then((users) => {
      res.setHeader('Content-type', 'applications/json');
      res.status(200).json(users);
    });
    if (!result) {
      send.status(400);
    }
  } catch (error) {
    next(error);
  }
};

//GET user by ID
const getUserById = async (req, res, next) => {
  /*
        #swagger.summary = 'Get User by Id'
        #swagger.description = 'Get specific user by id.'
        #swagger.parameters[id] = {
          required: true,
          description: 'Id of the user to be returned'
        }
        #swagger.responses[200] = {
          description: 'The cart requested',
          schema: { $ref: '#/definitions/User'}
        }
    */
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection(collection_name)
      .findOne({ _id: userId });
    res.setHeader('Content-type', 'applications/json');
    res.status(200).json(response);
    // if (!response) {
    //     res.status(400).json(response.error || 'Some error occured while getting user')
    // }
  } catch (error) {
    res
      .status(400)
      .json(response.error || 'Some error occured while getting user');
    next(error);
  }
};

//POST user
const createUser = async (req, res, next) => {
    /*
        #swagger.summary = 'Add User'
        #swagger.description = 'Add user to the database.'
        #swagger.parameters[New User] = {
          in: 'body',
          description: 'New user to be added',
          required: true,
          schema: {$ref: '#/definitions/NewUserExample'}
        }
        #swagger.responses[201]
        #swagger.responses[400]
    */
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      accountType: req.body.accountType,
      dateCreated: req.body.dateCreated,
      dateUpdated: req.body.dateUpdated,
      cartId: req.body.cartId,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection(collection_name)
      .insertOne(user);
    if (response.acknowledged) {
      res.status(200).json('User was Created');
    } else {
      res
        .status(500)
        .json(response.error || 'Some error occured while updating user.');
    }
  } catch (error) {
    next(error);
  }
};

//PUT user by ID
const editUser = async (req, res, next) => {
    /*
        #swagger.summary = 'Edit User'
        #swagger.description = 'Edit specific user by Id'
        #swagger.parameters[id] = {
          required: true,
          description: 'Id of the user to be edited'
        }
        #swagger.parameters[Update] = {
          in: 'body',
          required: true,
          description: 'Object with desired changes.',
          schema: {$ref: '#/definitions/UpdateUserExample'}
        }
        #swagger.responses[200]
        #swagger.responses[400]
    */
  try {
    const userId = new ObjectId(req.params.id);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      accountType: req.body.accountType,
      dateCreated: req.body.dateCreated,
      dateUpdated: req.body.dateUpdated,
      cartId: req.body.cartId,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection(collection_name)
      .replaceOne({ _id: userId }, user);
    if (response.acknowledged) {
      res.status(200).json('User was Edited');
    } else {
      res
        .status(500)
        .json(response.error || 'Some error occured while updating user.');
    }
  } catch (error) {
    next(error);
  }
};

//DELETE user by ID
const deleteUser = async (req, res, next) => {
  /*
        #swagger.summary = 'Delete User'
        #swagger.description = 'Delete user by Id'
        #swagger.parameters[id] = {
          required: true,
          description: 'Id of the object to delete'
        }
        #swagger.responses[204] = {
            description: 'Deleted item successfully.'
        }
    */
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection(collection_name)
      .deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(200).json('User was Deleted');
    } else {
      res
        .status(400)
        .json(response.error || 'Some error occured while deleting the user');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
};
