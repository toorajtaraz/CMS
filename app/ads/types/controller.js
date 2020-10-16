const {ok, error} = require('../../../core/tools/response');
const debug = require('debug')('ads:types');
const typeService = require('./service');

/**
 * @api {get} /api/ads/types getTypes
 * @apiName GetTypes
 * @apiGroup ads
 * @apiDescription returns an array of all Ad types and their costs
 * @apiSuccessExample {json} example:
 * {
    "status": "ok",
    "message": {
        "en": "Request was successful",
        "fa": "درخواست موفقیت آمیز بود"
    },
    "result": [
        {
            "_id": "5f89621c38dc1414487fa99e",
            "name": "123asd",
            "cost": 3663
        },
        {
            "_id": "5f89671cd36fc603344349fe",
            "name": "123asd",
            "cost": 3663
        }
    ]
}
 */

const get = async (req, res, next) => {
    const types = await typeService.getTypes();
    debug(types);
    ok(res, types);
};

module.exports = {
    get
};