const models = require('../models/model');

/**
 * retrieves an ad type from DB
 * @param id
 * @returns {Promise<*>}
 */
const getType = async (id) => await models.Type.findById(id);
/**
 * retrieves a coupon from DB
 * @param id
 * @returns {Promise<*>}
 */
const getCoupon = async (id) => await models.Coupon.findById(id);
/**
 * insert ad in DB
 * @param d
 * @returns {Promise<*>}
 */
const createAd=async (d)=>{
    const ad = new models.Ad({
        name:d.name,
        body:d.body,
        type:d.type,
        start:d.start,
        end:d.end,
        duration:d.duration,
        cost:d.cost,
        discount:d.discount,
        payed:false,
        savedOn:Date.now(),
        payedOn:null,
    });
    return await ad.save();
}

module.exports={
    getCoupon,
    getType,
    createAd,
}