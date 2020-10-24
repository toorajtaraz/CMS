const models = require('../models/model');

const getAds = async () => await models.Ad.find({});

module.exports = {
    getAds,
}