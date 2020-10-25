const {ok, error} = require('../../../core/tools/response');
const services = require('../services/get');
const debug = require('debug')('ads:get');

/**
 * @api {get} /api/ads getAds
 * @apiDescription retrieves all ads
 * @apiName getAds
 * @apiGroup ads
 * @apiSuccessExample {json} success-responce:
 * {
    "status": "ok",
    "message": {
        "en": "created ads",
        "fa": "درخواست موفقیت آمیز بود"
    },
    "result": [
        {
            "duration": 56,
            "discount": 0,
            "payed": false,
            "payedOn": null,
            "_id": "5f92ef13a15f8b17e4ed3446",
            "name": "something",
            "body": "some text",
            "type": "5f92ee4a500f0408eca2ccee",
            "start": "1399/11/10",
            "end": "1399/12/11",
            "cost": 56000,
            "savedOn": "2020-10-23T14:56:19.618Z",
            "__v": 0
        },
        {
            "duration": 1,
            "discount": 0,
            "payed": false,
            "payedOn": null,
            "_id": "5f92f22ea15f8b17e4ed3447",
            "name": "something",
            "body": "some text",
            "type": "5f92ee4a500f0408eca2ccee",
            "start": "1399/11/10",
            "end": "1399/11/11",
            "cost": 1000,
            "savedOn": "2020-10-23T15:09:34.308Z",
            "__v": 0
        }
    ]
}
 */

// TODO get ads by user
const get = async (req, res, next) => {
    const ads = await services.getAds();
    debug(ads);
    debug(res)
    return ok(res, ads, {en: "created ads"}, 200);
}

module.exports = get;
