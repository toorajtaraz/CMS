const { mongoose } = require('../db/mongoose');

const settingsSchema = new mongoose.Schema({
    sandBoxedPath: {
        type: String,
        default: '',
    },
    last_update: {
        type: Date,
        default: Date.now(),
    },
    restorePasswordHash: {
        type: String,
    },
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = {
    settingsSchema,
    Settings,
}

