const { Backup } = require('../models/backup');
const { Restore } = require('../models/restore');
const { backupColloctions, backupEverything } = require('../tools/backup');
const restoreColloctions = require('../tools/restore');
const { Settings } = require('../models/settings');
function backupRestoreDeamon() {
    console.log('BACKUP/RESTORE deamon running...');
    handleBackupQ();
}

async function callbackForBackup() {
    const onGoingBackup = await Backup.findOne({state: 1});
    onGoingBackup.state = 2;
    await onGoingBackup.save();
    await handleBackupQ();
}

async function callbackForRestore() {
    const onGoingRestore = await Restore.findOne({state: 1});
    onGoingRestore.state = 2;
    await onGoingRestore.save();
    await handleRestoreQ();
}

async function handleBackupQ() {
    if ((await Backup.find({state: 1})).length != 0) {
        setTimeout(handleBackupQ, 10000);
        return;
    }
    let path = await Settings.findOne();
    path = path === null ? '' : path.sandBoxedPath;
    let currentBackup = await Backup.find({state: 0}).sort({_id:1});
    if (currentBackup.length === 0) {
        return await handleRestoreQ();
    } else {
        currentBackup = currentBackup[0];
        currentBackup.state = 1;
        await currentBackup.save();
        if (currentBackup.is_full) {
            currentBackup.downloadLinkTar = backupEverything(currentBackup.owner, callbackForBackup, path, currentBackup._id);
            await currentBackup.save();
        } else {
            bcurrentBackup.downloadLinkTar = backupColloctions(currentBackup.owner, currentBackup.collections, callbackForBackup, path, currentBackup._id);
            await currentBackup.save();
        } 
    }
}
async function handleRestoreQ() {
    if ((await Restore.find({state: 1})).length != 0) {
        setTimeout(handleRestoreQ, 10000);
        return;
    }
    if ((await Backup.find({$or: [{state: 1}, {state: 0}]})).length != 0) {
        setTimeout(handleBackupQ, 10000);
        return;
    }
    let currentRestore = await Restore.find({state: 0}).sort({_id:1});
    if ((await Backup.find({state: 0})).length === 0 && currentRestore.length === 0) {
        return;
    }
    if (currentRestore.length === 0) {
        return await handleBackupQ();
    } else {
        currentRestore = await currentRestore[0].populate('fileName');
        restoreColloctions(currentRestore.owner, currentRestore.toBeDropped, 
            callbackForRestore, currentRestore.fileName, currentRestore.dropAll); 
    }
}

module.exports = () => { setInterval(backupRestoreDeamon, 86400000);};//deamon runs once a day!
