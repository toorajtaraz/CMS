const { Restore, RestoreFiles} = require('../../../core/models/restore');

const possible = async (id, bId) => {
    const restore = await Restore.findById(bId);
    if (!restore) {
        return {
            possible: false,
            log: 'restore does not exist!',
        };
    }
    if (restore.state != -1) {
        return {
            possible: false,
            log: 'restore has already started!',
        };
    }
    if (restore.owner.toString() != id) {
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

const removeFromRestoreQ = async (data) => {
    const cancelRestore = await Restore.findOneAndUpdate({_id: data}, {state : -100});
    return cancelRestore;
};

module.exports = {
    removeFromRestoreQ,
    possible
};
