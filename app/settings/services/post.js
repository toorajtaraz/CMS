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


const period_accepted = async (newbackup_period_hours , newbackup_period_days) => {
    return (await auth.period_is_acceptabel(newbackup_period_hours , newbackup_period_days));
};

const period_time_has_enterd = async (newbackup_period_hours , newbackup_period_days) => {
    return (await auth.period_has_enterd(newbackup_period_hours , newbackup_period_days));
};

const period_hours_accepted = async (newbackup_period_hours) => {
    return (await auth.period_is_in_range_hours(newbackup_period_hours));
};

const period_days_accepted = async (newbackup_period_days) => {
    return (await auth.period_is_in_range_days(newbackup_period_hours , newbackup_period_days));
};

const updateSettings = async (id, data) => {
    const update = {last_update : Date.now()};
    if(data.newPath) {
        update.sandBoxedPath = data.newPath;
    }
    if(data.newPassword) {
        update.passwordHash = await auth.hashPass(data.newPassword);
    }
    if(data.newbackup_period_hours) {
        update.backup_period_hours = data.newbackup_period_hours;
    }
    if(data.newbackup_period_days) {
        update.backup_period_days = data.newbackup_period_days;
    }
    const settings = await Settings.findOneAndUpdate({}, update);
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
    initiateBR,
    period_accepted,
    period_hours_accepted,
    period_days_accepted,
    period_time_has_enterd
    
};


