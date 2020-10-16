const mongoose = require('mongoose');
const {Schema} = mongoose;

const typeSchema = new Schema({
    name: {type:String,required: true},
    cost: {type: Number, required: true}
});

module.exports = typeSchema