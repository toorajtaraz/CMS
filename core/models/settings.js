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
    passwordHash: {
        type: String,
    },
    backup_period_hours: {
        type: String,
        default: '5',
        _id: backup_period_hours
    },
    backup_period_days: {
        type: String,
        default: '1',
        _id: backup_period_days
    }
});

const Settings = mongoose.model('Settings', settingsSchema, 'Settings');

module.exports = {
    settingsSchema,
    Settings,
}

