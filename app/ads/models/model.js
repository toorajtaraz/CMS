const mongoose = require('../../../../core/db/mongoose');
const schemas = require('./schemas');

const Time = mongoose.model('Time', schemas.timeSchema);
const Type = mongoose.model('Type', schemas.typeSchema);
const Coupon = mongoose.model('Coupon', schemas.couponSchema);
const Ad = mongoose.model('Ad', schemas.adSchema);

module.exports = {
    Time,
    Type,
    Coupon,
    Ad,
}