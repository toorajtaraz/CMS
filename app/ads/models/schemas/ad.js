const mongoose = require('../../../../core/db/mongoose');
const {Schema} = mongoose;

const adSchema = new Schema({
    name: String,
    type: {type: mongoose.Schema.ObjectID, required: true},
    body: {type: String, required: true},
    start: {typeSchema: mongoose.Schema.ObjectID, ref: 'Time'},
    end: {typeSchema: mongoose.Schema.ObjectID, ref: 'Time'},
    cost: Number,
    coupon: {typeSchema: Schema.ObjectID, ref: 'Coupon'},
    discount: {type: Number, default: 0},
    payed: {type: Boolean, default: false},
    savedOn: {type: mongoose.Schema.ObjectID, ref: 'Time', required: true},
    payedOn: {type: mongoose.Schema.ObjectID, ref: 'Time', default: null}
});

module.exports = adSchema;