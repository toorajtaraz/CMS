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
        default: Date.now(),
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
});

const Backup = mongoose.model('Backup', backupSchema);

module.exports = {
    backupSchema,
    Backup,
}
