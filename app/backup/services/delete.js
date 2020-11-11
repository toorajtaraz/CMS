const { Backup } = require('../../../core/models/backup');
const backup = require('../../../core/models/backup');
const possible = async (id, bId) => {
    const backup = await Backup.findById(bId);
    if (!backup) {
        return {
            possible: false,
            log: 'backup does not exist!',
        };
    }
    if (backup.state != 0) {
        return {
            possible: false,
            log: 'backup has already started!',
        };        
    }
    if (backup.owner.toString() != id) {
        return {
            possible: false,
            log: 'you do not own it!',
        }
    }
    return {
        possible: true,
        log: 'good to go',
    };
};

const removeFromBackupQ = async (data) => {
    const cancelBackup = await Backup.findOneAndUpdate({_id: data}, {state : -100});
    return cancelBackup;
};

module.exports = {
    removeFromBackupQ,
    possible
};
