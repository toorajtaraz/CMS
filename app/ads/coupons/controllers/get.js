const {ok, error} = require('../../../../core/tools/response');
const services = require('../services');
const debug = require('debug')('ads:coupons');


/**
 * @api {get} /api/ads/coupons/code/:code getCouponByCode
 * @apiDescription returns the coupon with the given code
 * @apiName getCouponByCode
 * @apiGroup ads
 * @apiSuccessExample response:
 * {
    "status": "ok",
    "message": {
        "en": "Request was successful",
        "fa": "درخواست موفقیت آمیز بود"
    },
    "result": {
        "isPercent": false,
        "available": 25,
        "exceptions": [],
        "_id": "5f915bf416e7c72ae03e9996",
        "code": "123abc",
        "amount": 1000,
        "__v": 0
    }
}
 */
const getByCode = async (req, res, next) => {
    const code = req.params.code;
    debug("code: "+code)
    const coupon = await services.getCouponByCode(code);
    debug(coupon);
    if (!coupon) {
        return error(res, 404, {en: 'Coupon not found!'});
    }

    if (coupon.exceptions.some(ex => ex === req.user.id)) {
        return error(res, 403, {en: "User can't use this coupon"})
    }
    return ok(res, coupon);
}

/**
 * @api {get} /api/ads/coupons/id/:id getCouponById
 * @apiDescription returns the coupon with the given ID
 * @apiName getCouponById
 * @apiGroup ads
 * @apiSuccessExample response:
 * {
    "status": "ok",
    "message": {
        "en": "Request was successful",
        "fa": "درخواست موفقیت آمیز بود"
    },
    "result": {
        "isPercent": false,
        "available": 25,
        "exceptions": [],
        "_id": "5f915bf416e7c72ae03e9996",
        "code": "123abc",
        "amount": 1000,
        "__v": 0
    }
}
 */
const getById = async (req, res, next) => {
    const id= req.params.id;
    const coupon = await services.getCouponById(id);
    if (!coupon) {
        return error(res, 404, {en: 'Coupon not found!'});
    }

    if (coupon.exceptions.some(ex => ex === req.user.id)) {
        return error(res, 403, {en: "User can't use this coupon"})
    }
    return ok(res, coupon);
}

module.exports={
    getByCode,
    getById,
}