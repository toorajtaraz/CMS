const mongoose = require('mongoose');
const {Schema} = mongoose;

const couponSchema = new Schema({
    code: {type: String, required: true},
    amount: {type: Number, required: true},
    isPercent: {type: Boolean, default: false},
    // how many more people can use this
    available: {type: Number, default: 1},
    // people who can't use this
    exceptions: [mongoose.Schema.ObjectID],
})

module.exports = couponSchema;