const {mongoose} = require('../../../core/db/mongoose');

const userSchema= new mongoose.Schema({
    name:String
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
    exceptions: [mongoose.Schema.Types.ObjectId],
})


const adSchema = new mongoose.Schema({
    name: String,
    type: {type: mongoose.Schema.Types.ObjectId, required: true},
    body: {type: String, required: true},
    start: {type: Date},
    end: {typeSchema: Date},
    cost: Number,
    coupon: {type: mongoose.Schema.Types.ObjectId, ref: 'Coupon'},
    discount: {type: Number, default: 0},
    payed: {type: Boolean, default: false},
    savedOn: {type: Date, required: true},
    payedOn: {type: Date, default: null}
});


const User = mongoose.model('User', userSchema);
const Type = mongoose.model('Type', typeSchema);
const Coupon = mongoose.model('Coupon', couponSchema);
const Ad = mongoose.model('Ad', adSchema);

module.exports = {
    User,
    Type,
    Coupon,
    Ad,
}