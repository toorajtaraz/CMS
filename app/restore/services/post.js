const { Restore } = require('../../../core/models/restore');
const { Settings } = require('../../../core/models/settings');
const { Banned } = require('../../../core/models/banned');
const auth = require('../../../core/auth/auth');

const banUser = async (id) => {
   await Banned.create({
        user: id,
   }); 
};

const isBanned = async (id) => {
   return (await Banned.findOne({user: id})) ? true : false;
};

const canAccess = async (password) => {
    const currentHashPass = (await Settings.findOne()).restorePasswordHash;
    return await auth.isPassValid(password, currentHashPass); 
};

const addToRestoreQ = async (id, data) => {
    const restore = await Restore.create({
        owner: id,
        dropAll: data.dropAll,
        state: -1,
        fileName: data.file,
        toBeDropped: (data.dropAll) ? null : data.toBeDropped,
    });
    return  restore;
};

module.exports = {
    addToRestoreQ,
    canAccess,
    banUser,
    isBanned
};


