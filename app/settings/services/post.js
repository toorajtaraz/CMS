const { Settings } = require('../../../core/models/settings');
const { Banned } = require('../../../core/models/banned');
const auth = require('../../../core/auth/auth');
const BRD = require('../../../core/tools/BRD');

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

const updateSettings = async (id, data) => {
    const update = {last_update : Date.now()};
    if(data.newPath) {
        update.sandBoxedPath = data.newPath;
    }
    if(data.newPassword) {
        update.passwordHash = await auth.hashPass(data.newPassword);
    }
    if(data.collections) {
        update.collections = data.collections;
    }
    let settings = await Settings.findOneAndUpdate({}, update);
    settings = await Settings.findOne();
    return  settings;
};

const initiateBR = () => {
    BRD.backupRestoreDeamon();
}

module.exports = {
    updateSettings,
    canAccess,
    banUser,
    isBanned,
    initiateBR
};


