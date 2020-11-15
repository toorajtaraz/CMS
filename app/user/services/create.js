const models = require('../models/models');

const createUser = async (username, password,role) => await (new models.User({username, password,role})).save();

const getType = async (name) => await models.Role.findOne({name, is_deleted: false});

module.exports = {
    createUser,
    getType,
}