//Contributed by Jared Scott

// Imports
const mongodb = require('../db/database'); //Change as needed for database function location
const ObjectId = require('mongodb').ObjectId;

// Database collection name values
const collection_name = 'carts';

//GET all carts
const getAllCarts = async (req, res, next) => {
    /*
      #swagger.summary = 'Get All Carts'
      #swagger.descripton = 'Get all carts in the database'
      #swagger.responses[200] = {
        description: 'List of all carts',
        schema: { $ref: '#/definitions/Carts'}
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

//GET cart by ID
//This will have to be changed later for individual user shopping Carts
const getCartByUserId = async (req, res, next) => {
    /*
      #swagger.summary = 'Get Cart by Id'
      #swagger.description = 'Get a specific cart by the id of the cart'
      #swagger.parameters[id] = {
        required: true,
        description: 'Id of the cart to be returned'
      }
      #swagger.responses[200] = {
        description: 'The cart requested',
        schema: { $ref: '#/definitions/Cart'}
      }
     */
  try {
    const cartId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection(collection_name)
      .findOne({ _id: cartId });
    res.setHeader('Content-type', 'applications/json');
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .json(response.error || 'Some error occured while getting cart');
    next(error);
  }
};

//POST cart
const createCart = async (req, res, next) => {
    /*
      #swagger.summary = 'Create Cart'
      #swagger.description = 'Create a new cart record in the database'
      #swagger.parameters[New Cart] = {
        in: 'body',
        description: 'New Cart to be added',
        required: true,
        schema: {$ref: '#/definitions/NewCartExample'}
      }
      #swagger.responses[201]
      #swagger.responses[400]
     */
  try {
    const cart = {
      products: req.body.products, //this will be an array of values
      userId: req.body.userId,
      cartTotal: req.body.cartTotal,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection(collection_name)
      .insertOne(cart);
    if (response.acknowledged) {
      res.status(201).json('User was Created');
    } else {
      res
        .status(500)
        .json(response.error || 'Some error occured while creating cart.');
    }
  } catch (error) {
    next(error);
  }
};

//PUT cart by ID
const editCart = async (req, res, next) => {
    /*
      #swagger.summary = 'Edit Cart'
      #swagger.description = 'Edit a cart by id'
      #swagger.parameters[id] = {
        required: true,
        description: 'Id of the cart to be edited'
      }
      #swagger.parameters[Update] = {
        in: 'body',
        required: true,
        description: 'Object with desired changes.',
        schema: {$ref: '#/definitions/UpdateCartExample'}
      }
      #swagger.responses[200]
      #swagger.responses[400]
     */
  try {
    const cartId = new ObjectId(req.params.id);
    const cart = {
      products: req.body.products, //this will be an array of values
      userId: req.body.userId,
      cartTotal: req.body.cartTotal,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection(collection_name)
      .replaceOne({ _id: cartId }, cart);
    if (response.acknowledged) {
      res.status(200).json('Cart was Edited');
    } else {
      res
        .status(500)
        .json(response.error || 'Some error occured while updating cart.');
    }
  } catch (error) {
    next(error);
  }
};

//DELETE cart by ID
const deleteCart = async (req, res, next) => {
    /**
      #swagger.summary = 'Delete Cart'
      #swagger.description = 'Delete cart by provided Id'
      #swagger.parameters[id] = {
        required: true,
        description: 'Id of the object to delete'
      }
      #swagger.responses[204] = {
        description: 'Item deleted successfully.'
      }
     */
  try {
    const cartId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection(collection_name)
      .deleteOne({ _id: cartId });
    if (response.deletedCount > 0) {
      res.status(200).json('Cart was Deleted');
    } else {
      res
        .status(400)
        .json(response.error || 'Some error occured while deleting the cart');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCarts,
  getCartByUserId,
  createCart,
  editCart,
  deleteCart,
};
