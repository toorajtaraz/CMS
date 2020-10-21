const models = require('../models/model');

const getCouponById = async (id) => await models.Coupon.findById(id, '-exceptions');
const getCouponByName = async (name) => await models.Coupon.find({name}, '-exceptions');
const useCoupon = async (id, userId) => await models.Coupon.findByIdAndUpdate(id, {$inc: {available: -1}});



module.exports = {
    getCouponById,
    getCouponByName,
    useCoupon
}