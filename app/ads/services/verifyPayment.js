const models = require('../models/model');
const moment = require('moment');
/**
 *
 * @param id
 * @returns {Promise<*>}
 */
const getAd = async (id) => await models.Ad.findById({id}).populate('receipt');

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
const setAdSaved = async (id) => await models.Ad.findOneAndUpdate({_id: id}, {
    payed: true,
    savedOn: moment(Date.now()).format('YYYY-MM-DD')
});

module.exports = {
    getAd,
    setAdSaved,
}
