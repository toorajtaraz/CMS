const {ok, error} = require('../../../core/tools/response');
const services = require('../services/get');
const debug = require('debug')('users:get');

/**
 * @api {get} /api/users getUsers
 * @apiGroup user
 * @apiName getAllUsers
 * @apiDescription receive all users
 * @apiSuccessExample {json} success-response:
 {
    "status": "ok",
    "message": {
        "en": "Request was successful",
        "fa": "درخواست موفقیت آمیز بود"
    },
    "result": [
        {
            "_id": "5f953a999c107a306c45b356",
            "username": "ghnhamed"
        },
        {
            "_id": "5f953e9654c79c58d4457422",
            "username": "salamKhoshgela"
        }
    ]
}
 */
const getAll = async (req, res, next) => {
    const users = await services.getAll();
    debug(users);
    return ok(res, users);
};

module.exports = getAll;
