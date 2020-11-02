const { mongoose } = require('../db/mongoose');

const restoreSchema = new mongoose.Schema({
    toBeDropped: [
        {
            type: String
        }
    ],
    dropAll: {
        type: Boolean,
        default: false
    },
    fileName: {
        type: String
    },
    state: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Restore = mongoose.model('Restore', restoreSchema);

module.exports = {
    restoreSchema,
    Restore,
}
