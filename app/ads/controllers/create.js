const {ok, error} = require('../../../core/tools/response');
const ajv = require('ajv')({allErrors: true});
const isValidID = require('mongoose').Types.ObjectId.isValid;
const validationSchema = require('../schemas/create');
const services = require('../services/create');
const moment = require('moment');
const debug = require('debug')('ads:create')

/**
 * Validates the request body
 * @param body
 * @returns {{valid: boolean, error: string}|{valid: boolean, error: Array<ajv.ErrorObject>}|{valid: boolean}}
 */
function validateBody(body) {
    const valid = ajv.validate(validationSchema, body);
    if (!valid)
        return {valid: false, error: ajv.errors,}
    if (!isValidID(body.typeID))
        return {valid: false, error: "invalid type ID"};
    if (body.couponID && !isValidID(body.couponID))
        return {valid: false, error: "invalid Coupon ID"};
    return {valid: true};
}

/**
 * @api {post} /api/ads createAd
 * @apiName createAd
 * @apiGroup ads
 * @apiParam {String} name          Name of the ad
 * @apiParma {String} typeID        Ad's type objectId(must receive it through its API
 * @apiParam {String} start         Start date for the ad in YYYY-MM-DD format
 * @apiParam {Number} Duration      duration of the ad in days(between 1 and 90)
 * @apiParam {String} [couponID]    optional coupon ID for discount(you can receive the ID for an specific coupon through its API)
 * @apiParam {String} body          the HTML or markup ad body
 * @apiSuccessExample {json} success-response:
 *  {
    "status": "ok",
    "message": {
        "en": "Advertisement successfully created.",
        "fa": "درخواست موفقیت آمیز بود"
    },
    "result": {
        "name": "something",
        "body": "some text",
        "coupon": {
            "isPercent": true,
            "available": 10,
            "exceptions": [],
            "_id": "5f93c330b0249043348a8bab",
            "code": "123abd",
            "amount": 10,
            "__v": 0
        },
        "couponID": "5f93c330b0249043348a8bab",
        "type": {
            "_id": "5f92ee4a500f0408eca2ccee",
            "name": "type 1",
            "cost": 1000,
            "__v": 0
        },
        "start": "2020-10-26",
        "duration": 30,
        "end": "2020-11-25",
        "cost": 27000,
        "discount": 3000
    }
}
 */

// TODO add the user stuff, ads don't have owners RN
const create = async (req, res, next) => {
    const body = req.body;
    const result = validateBody(body);
    const data = {name: body.name, body: body.body};
    // validate body
    if (!result.valid)
        return error(res, 400, {en: result.error});
    // validate coupon if exists
    if (body.couponID) {
        let coupon = await services.getCoupon(body.couponID);
        if (!coupon)
            return error(res, 404, {en: 'coupon not found'});
        if (coupon.available < 1)
            return error(res, 400, {en: 'coupon expired'});
        data.coupon = coupon;
        data.couponID = coupon._id;
    }
    // validate typeId
    let type = await services.getType(body.typeID);
    if (!type)
        return error(res, 404, {en: 'type not found'});
    data.type = type;

    let start = moment(body.start, 'YYYY-MM-DD');
    if (!start.isValid() || !start.isAfter(Date.now()))
        return error(res, 400, {en: 'invalid start date'});
    data.start = body.start;
    data.duration = body.duration;
    data.end = start.add(body.duration, 'day').format('YYYY-MM-DD');

    data.cost = type.cost * data.duration;
    data.discount = 0;
    if (data.coupon) {
        data.discount = data.coupon.isPercent ? data.cost * data.coupon.amount / 100 : data.coupon.amount;
        data.cost -= data.discount;
    }
    debug(data);
    const ad = await services.createAd({
        name: data.name,
        type: data.type._id,
        body: data.body,
        start: data.start,
        end: data.end,
        duration: data.duration,
        cost: data.cost,
        coupon: data.couponID,
        discount: data.discount,
    });
    if (!ad)
        return error(res, 500, {en: "something went really wrong over here"});
    return ok(res, data, {en: 'Advertisement successfully created.'});
};

module.exports = create;
