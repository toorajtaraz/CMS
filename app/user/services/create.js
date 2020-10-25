const models = require('../models/models');

const createUser = async (username, password) => await (new models.User({username, password})).save();

module.exports={
    createUser
}