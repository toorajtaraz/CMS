const { Backup } = require('../../../core/models/backup');
const backup = require('../../../core/models/backup');
const possible = async (id, bId) => {
    const backup = await Backup.findById(bId);
    if (!backup) {
        return {
            possible: false,
            log: {en :'backup does not exist!', fa:'پشتیبان گیری پیدا نشد'},
        };
    }
    if (backup.state != 0) {
        return {
            possible: false,
            log: {en:'current state can not be canceled', fa:'شرایط فعلی قابل کنسل شدن نیست'},
        };        
    }
    if (backup.owner.toString() != id) {
        return {
            possible: false,
            log: {en: 'you do not own it!', fa:'این پشتیبان گیری به شما تعلق ندارد'},
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
