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
    collections: [
        {
            type: String
        }
    ],
    passwordHash: {
        type: String,
    },
});

const Settings = mongoose.model('Settings', settingsSchema, 'Settings');

module.exports = {
    settingsSchema,
    Settings,
}

