const models = require('../models/model');

const getTypes = async () => await models.Type.find({}, ['name', 'cost']);
const createType = async (name, cost) => await (new models.Type({name, cost})).save();

module.exports.getTypes = getTypes;
module.exports.createType = createType;