//Contributed by Jared Scott

// Imports
const mongodb = require('../db/database'); //Change as needed for database function location
const ObjectId = require('mongodb').ObjectId;


// Database collection name values
const collection_name = 'orders'


//GET all orders
const getAllOrders = async (req, res, next) => {
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


//GET order by ID
const getOrderById = async (req, res, next) => {
    try {
        const orderId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection(collection_name).findOne({_id:orderId});
            res.setHeader('Content-type', 'applications/json');
            res.status(200).json(response);
        // if (!response) {
        //     res.status(400).json(response.error || 'Some error occured while getting order')
        // }
    } catch (error) {
        res.status(400).json(response.error || 'Some error occured while getting order')
        next(error)
    }
};

//POST order
// UserId for user, 
// cartId for their specific cart and the product array within

const createOrder = async (req, res, next) => {
    try {
        const order = {
            cartId: req.body.cartId,
            userId: req.body.userId,
            dateCreated: req.body.dateCreated
        };
        const response = await mongodb.getDatabase().db().collection(collection_name).insertOne(order);
        if (response.acknowledged) {
            res.status(200).json('User was Created');
        } else {
            res.status(500).json(response.error || 'Some error occured while creating order.');
        }
    } catch (error) {
        next(error)
    }
}

//PUT order by ID
const editOrder = async (req, res, next) => {
    try {
        const orderId = new ObjectId(req.params.id);
        const order = {
            cartId: req.body.cartId,
            userId: req.body.userId,
            dateCreated: req.body.dateCreated
        };
        const response = await mongodb.getDatabase().db().collection(collection_name).replaceOne({_id:orderId}, order);
        if (response.acknowledged) {
            res.status(200).json('Order was Edited');
            } else {
                res.status(500).json(response.error || 'Some error occured while updating order.');
            } 
    } catch (error) {
        next(error)
    };
}

//DELETE order by ID
const deleteOrder = async (req, res, next) => {
    try {
        const orderId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection(collection_name).deleteOne({_id:orderId});
        if (response.deletedCount > 0) {
            res.status(200).json('Order was Deleted');
        } else {
            res.status(400).json(response.error || 'Some error occured while deleting the order')
        };
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    editOrder,
    deleteOrder
}