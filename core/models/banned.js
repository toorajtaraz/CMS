const { mongoose } = require('../db/mongoose');

const bannedSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Banned = mongoose.model('Banned', bannedSchema, 'Banned');

module.exports = {
    bannedSchema,
    Banned,
}

