const models = require('../models/model');

const getTypes = async () => await models.Type.find({}, ['name','cost']);

module.exports.getTypes = getTypes;