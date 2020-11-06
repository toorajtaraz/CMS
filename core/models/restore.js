const { mongoose } = require('../db/mongoose');
const {Mongoose} = require('mongoose');
const restoreFilesSchema = new mongoose.Schema({
    tar: {
        type: String,
        required: true,
    },
    hasZip: {
        type: Boolean,
        default: false,
    },
    zip: {
        type: String,
        default: '',
    }
});

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestoreFiles',
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
const RestoreFiles = mongoose.model('RestoreFiles', restoreFilesSchema);

module.exports = {
    restoreSchema,
    Restore,
    restoreFilesSchema,
    RestoreFiles,
};
