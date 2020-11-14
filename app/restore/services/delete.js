const { Restore, RestoreFiles} = require('../../../core/models/restore');

const possible = async (id, bId) => {
    const restore = await Restore.findById(bId);
    if (!restore) {
        return {
            possible: false,
            log: {en:'restore does not exist!', fa:'بازنشانی پیدا نشد'},
        };
    }
    if (restore.state != -1) {
        return {
            possible: false,
            log: {en:'current state can not be canceled', fa:'شرایط فعلی قابل کنسل شدن نیست'},
        };
    }
    if (restore.owner.toString() != id) {
        return {
            possible: false,
            log: {en:'you do not own it!', fa:'بازنشانی به شما تعلق ندارد'},
        }
    }
    return {
        possible: true,
        log: 'good to go',
    };
};

const removeFromRestoreQ = async (data) => {
    const cancelRestore = await Restore.findOneAndUpdate({_id: data}, {state : -100});
    return cancelRestore;
};

module.exports = {
    removeFromRestoreQ,
    possible
};
