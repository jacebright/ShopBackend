//Contributed by Jared Scott

// Imports
const mongodb = require('../db/database'); //Change as needed for database function location
const ObjectId = require('mongodb').ObjectId;


// Database collection name values
const collection_name = 'TBD'


//GET all users
const getAllUsers = async (req, res, next) => {
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

//GET user by ID
const getUserById = async (req, res, next) => {
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection(collection_name).find({_id:userId});
        result.toArray()
        .then((users) => {
            res.setHeader('Content-type', 'applications/json');
            res.status(200).json(users);
        });
        if (!result) {
            res.status(400).json(response.error || 'Some error occured while getting user')
        }
    } catch (error) {
        next(error)
    }
};

//POST user
const createUser = async (req, res, next) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday,
            accountCreated: req.body.accountCreated,
            admin: req.body.admin 
        };
        const response = await mongodb.getDatabase().db().collection(collection_name).insertOne(user);
        if (response.acknowledged) {
            res.status(200).json('User was Created');
        } else {
            res.status(500).json(response.error || 'Some error occured while updating user.');
        }
    } catch (error) {
        next(error)
    }
}

//PUT user by ID
const editUser = async (req, res, next) => {
    try {
        const userId = new ObjectId(req.params.id);
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday,
            admin: req.body.admin 
        };
        const response = await mongodb.getDatabase().db().collection(collection_name).replaceOne({_id:userId}, user);
        if (response.acknowledged) {
            res.status(200).json('User was Edited');
            } else {
                res.status(500).json(response.error || 'Some error occured while updating user.');
            } 
    } catch (error) {
        next(error)
    };
}

//DELETE user by ID
const deleteUser = async (req, res, next) => {
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection(collection_name).deleteOne({_id:userId});
        if (response.deletedCount > 0) {
            res.status(200).json('User was Deleted');
        } else {
            res.status(400).json(response.error || 'Some error occured while deleting the user')
        };
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser
}