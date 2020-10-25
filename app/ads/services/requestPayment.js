const models = require('../models/model');


const getAd = async (id) => await models.Ad.find(id);
const giveAdaReceipt = async (adId, authority, amount) => {
    const ad = await models.Ad.find(id);
    const receipt = await (new models.Receipt({amount, authority})).save();
    return models.Ad.findOneAndUpdate({_id: ad._id}, {receipt: receipt._id});
};

module.exports = {
    getAd,
    giveAdaReceipt,
};