const {ok, error} = require('../../../core/tools/response');
const ajv = require('ajv')({allErrors: true});
const services = require('../services/create');
const createSchema = require('../schemas/create');
const debug = require('debug')('users:create');


/**
 * @api {post} /api/users createUser
 * @apiName createUser
 * @apiDescription Create a new user
 * @apiGroup user
 * @apiParam {String} username username min 6 characters
 * @apiParam {String} password password min 6 characters
 * @apiSuccessExample {json} success-response:
 * {
    "status": "ok",
    "message": {
        "en": "Request was successful",
        "fa": "درخواست موفقیت آمیز بود"
    },
    "result": {
        "id": "5f953a999c107a306c45b356",
        "username": "ghnhamed"
    }
}
 */
const create = async (req, res, next) => {
    const body = req.body;
    const valid = ajv.validate(createSchema, body)
    debug(body);
    if (!valid)
        return error(res, 400, {en: ajv.errors});
    const user = await services.createUser(body.username, body.password);
    debug(user);
    if (!user)
        return error(res, 500, {en: "something went really, really wrong :'("});
    return ok(res, {id: user._id, username: user.username});
}

module.exports = create;
