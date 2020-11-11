const { Restore, RestoreFiles} = require('../../../core/models/restore');
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
    const currentHashPass = (await Settings.findOne()).passwordHash;
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

const createRestoreFile = async (tar, zip=null) => {
    const rf = {tar: tar};
    if (zip != null) {
        rf.hasZip = true;
        rf.zip = zip;
    }
    const restoreFiles = await RestoreFiles.create(rf);
    return restoreFiles;
}



module.exports = {
    addToRestoreQ,
    canAccess,
    banUser,
    isBanned,
    createRestoreFile,
};


