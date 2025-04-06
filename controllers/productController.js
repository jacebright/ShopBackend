//Contributed by Jared Scott

// Imports
const mongodb = require('../db/database'); //Change as needed for database function location
const ObjectId = require('mongodb').ObjectId;


// Database collection name values
const collection_name = 'TBD'


/* I assume this collection will include product names, item count and an item ID, 
   so I will build the POST request accordingly.
*/


//GET Product inventory
const getInventory = async (req, res, next) => {
    /*
        #swagger.summary = 'Get All Products'
        #swagger.descriptioin = 'Get all products in the database.'
        #swagger.responses[200]
    */
    try {
        const result = await mongodb.getDatabase().db().collection(collection_name).find();
            result.toArray()
            .then((users) => {
                res.setHeader('Content-type', 'applications/json');
                res.status(200).json(users);
            })
            if (!result) {
                send.status(400);
            }
    } catch (error) {
        next(error)
    }
};

//GET product by ID
const getProductById = async (req, res, next) => {
    /*
        #swagger.summary = 'Get Product by Id'
        #swagger.description = 'Get specific product by id.'
        #swagger.responses[200]
    */
    try {
        const productId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection(collection_name).find({_id:productId});
        result.toArray()
        .then((users) => {
            res.setHeader('Content-type', 'applications/json');
            res.status(200).json(users);
        });
        if (!result) {
            res.status(400).json(response.error || 'Some error occured while getting product')
        }
    } catch (error) {
        next(error)
    }
};

//POST new product
const addProduct = async (req, res, next) => {
  /*
        #swagger.summary = 'Add Product'
        #swagger.description = 'Add product to the database.'
        #swagger.responses[201]
        #swagger.responses[400]
    */
  try {
    const product = {
      productId: req.body.productId,
      productPrice: req.body.productPrice,
      productName: req.body.productName,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection(collection_name)
      .insertOne(product);
    if (response.acknowledged) {
      res.status(201).json("Product was Created");
    } else {
      res
        .status(500)
        .json(response.error || "Some error occured while updating product.");
    }
  } catch (error) {
    next(error);
  }
}

//PUT product by ID
const editProduct = async (req, res, next) => {
  /*
        #swagger.summary = 'Edit Product'
        #swagger.description = 'Edit specific product by Id'
        #swagger.responses[200]
        #swagger.responses[400]
    */
  try {
    const productId = new ObjectId(req.params.id);
    const product = {
      productName: req.body.productName,
      productInventory: req.body.productInventory,
      //change any fields if needed.
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection(collection_name)
      .replaceOne({ _id: productId }, product);
    if (response.acknowledged) {
      res.status(200).json("User was Edited");
    } else {
      res
        .status(500)
        .json(response.error || "Some error occured while updating product.");
    }
  } catch (error) {
    next(error);
  }
}

//DELETE product by ID
const deleteProduct = async (req, res, next) => {
    /*
        #swagger.summary = 'Delete Product'
        #swagger.description = 'Delete product by Id'
        #swagger.responses[204] = {
            description: 'Deleted item successfully.'
        }
    */
    try {
        const productId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection(collection_name).deleteOne({_id:productId});
        if (response.deletedCount > 0) {
            res.status(204).json('User was Deleted');
        } else {
            res.status(400).json(response.error || 'Some error occured while deleting the product')
        };
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getInventory,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct
}