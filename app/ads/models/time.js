const mongoose = require('mongoose');
const {Schema} = mongoose;

const timeSchema = new Schema({
    date: Date,
    time: Number
})

module.exports = timeSchema;