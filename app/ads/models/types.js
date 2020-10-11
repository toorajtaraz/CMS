const mongoose = require('mongoose');
const {Schema} = mongoose;

const costCalculationMethod = new Schema({});

const typeSchema = new Schema({
    name: String,
    extensions: [String],
    costCalculationMethod: {
        type: Schema.ObjectID,
        ref: 'CostCalculationMethod'
    }
});

module.exports = {
    costCalculationMethod,
    typeSchema,
}