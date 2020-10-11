const mongoose = require('mongoose');
const {Schema} = mongoose;

const couponSchema = new Schema({
    code: String,
    amount: Number,
    percentage: Boolean,
    used: Boolean
})

module.exports = couponSchema;