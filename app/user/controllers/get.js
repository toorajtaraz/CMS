const {ok, error} = require('../../../core/tools/response');
const services = require('../services/get');
const debug = require('debug')('users:get');

const getAll = async (req, res, next) => {
    const users= await services.getAll();
    debug(users);
    return ok(res, users);
};

module.exports = getAll;
