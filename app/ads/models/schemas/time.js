const mongoose = require('mongoose');
const {Schema} = mongoose;

const timeSchema = new Schema({
    date: {type: Date, required: true},
    time: {type: Number, required: true},
})

module.exports = timeSchema;