const mongodb = require('../data/database');

const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
const result = await mongodb.getDatabase().collection('contact').find()
    result.toArray().then((users) => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(users);

    });
};
const getsingle = async (req, res) => {
    
    const contactId = new objectId(req.params.id);
    // const result = await mongodb.getDatabase().db().collection('contact').find({_id: contactId});
    
    const result = await mongodb.getDatabase().collection('contact').find({_id: contactId});
    result.toArray().then((users) => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(users[0]);

    });
};

const createUser = async (req, res) => {
    // #swagger.tags = ['users'];
    // Implementation for creating a user
    const user={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().collection('contact').insertOne(user)
    if (response.insertedId ) {
        res.status(201).json({_id: response.insertedId});
    } else {
    res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
    };

const updateUser = async (req, res) => {
    // #swagger.tags = ['users'];
    const contactId = new objectId(req.params.id);
    const user={
         firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().collection('contact').updateOne({_id: contactId}, {$set: user});
    if (response.modifiedCount > 0) {
        res.status( 204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};
const deleteUser = async (req, res) => {
    // #swagger.tags = ['users'];
    const contactId = new objectId(req.params.id);
    const response = await mongodb.getDatabase().collection('contact').deleteOne({_id: contactId} );
    if (response.deletedCount > 0) {
        res.status( 204).send(); 
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
};
module.exports = {
    getAll,
    getsingle,
    createUser,
    updateUser,
    deleteUser
};