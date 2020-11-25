const { mongoose } = require('../db/mongoose');

const backupSchema = new mongoose.Schema({
    collections: [
        {
            type: String
        }
    ],
    is_full: {
        type: Boolean,
        default: false
    },
    state: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: new Date().toUTCString(),
    },
    downloadLinkTar: {
        type: String,
        default: '',
    },
    downloadLinkZip: {
        type: String,
        default: '',
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    is_automated: {
        type: Boolean,
        default: false
    }
});

const Backup = mongoose.model('Backup', backupSchema, 'Backup');

module.exports = {
    backupSchema,
    Backup,
}
