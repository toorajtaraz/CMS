const models = require('../models/model');

const checkBlocked = async (id) => {
    await models.Type.findById(id);
    
}
