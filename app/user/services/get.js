const models = require('../models/models');

const getAll = async () => await models.User.find({is_deleted: false}, '_id username role password').populate('role');

module.exports={
    getAll
}