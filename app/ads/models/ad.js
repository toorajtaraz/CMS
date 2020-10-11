const mongoose = require('mongoose');
const {Schema} = mongoose;

const adSchema = new Schema({
    name: String,
    start: {
        typeSchema: Schema.ObjectID,
        ref: 'Time'
    },
    end: {
        typeSchema: Schema.ObjectID,
        ref: 'Time'
    },
    cost: Number,
    coupon: {
        typeSchema: Schema.ObjectID,
        ref: 'Coupon'
    },
    discount: Number,
    payed: Boolean,
    savedAt: Number
});

module.exports = adSchema;