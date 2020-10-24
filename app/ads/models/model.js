const {mongoose} = require('../../../core/db/mongoose');

const userSchema = new mongoose.Schema({
    name: String
})

const typeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cost: {type: Number, required: true}
});

const couponSchema = new mongoose.Schema({
    code: {type: String, required: true},
    amount: {type: Number, required: true},
    isPercent: {type: Boolean, default: false},
    // how many more people can use this
    available: {type: Number, default: 1},
    // people who can't use this
    exceptions: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
})


const adSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: mongoose.Schema.Types.ObjectId, required: true},
    body: {type: String, required: true},
    start: {type: String, required: true},
    end: {type: String, required: true},
    duration: {type: Number, required: true, default: 1},
    cost: {type: Number, required: true},
    coupon: {type: mongoose.Schema.Types.ObjectId, ref: 'Coupon', required: false},
    discount: {type: Number, default: 0},
    payed: {type: Boolean, default: false},
    savedOn: {type: Date, required: true},
    payedOn: {type: Date, default: null},
    receipt: {type: mongoose.Schema.Types.ObjectID, ref: 'Receipt', default: null, required: false},
});

const receiptSchema = new mongoose.Schema({
    authority: {type: String, required: true},
    amount: {type: Number, required: true},
});


const User = mongoose.model('User', userSchema);
const Type = mongoose.model('Type', typeSchema);
const Coupon = mongoose.model('Coupon', couponSchema);
const Ad = mongoose.model('Ad', adSchema);
const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = {
    User,
    Type,
    Coupon,
    Ad,
    Receipt,
};