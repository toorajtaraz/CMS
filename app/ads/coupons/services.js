const models = require('../models/model');

const getCouponById = async (id) => await models.Coupon.findById(id);
const getCouponByCode = async (code) => await models.Coupon.findOne({code});
const useCoupon = async (id) => await models.Coupon.findByIdAndUpdate(id, {$inc: {available: -1}});

module.exports = {
    getCouponById,
    getCouponByCode,
    useCoupon,
}