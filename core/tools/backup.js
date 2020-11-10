const backupHelper = require('./backupRestoreSpawn').backup;
const config = require('config');
const fs = require('fs');
const archiver = require('archiver');
const { Backup } = require('../models/backup');
const backupFiles = (name, id) => {
    const output = fs.createWriteStream(__dirname + '/' + name + '.zip');
    const archive = archiver('zip');
    archive.on('error', function(err){
        console.log(err);
    });
    output.on('close', async function () {
        const backup = await Backup.findByIdAndUpdate(id, {downloadLinkZip: name + '.zip'});
    });
    archive.pipe(output);
    archive.directory(__dirname + '/../../static', false);
    archive.finalize();
};

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; 
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd,
        '-',
        this.getHours(),
        '-',
        this.getMinutes(),
        '-',
        this.getSeconds(),
    ].join('');
};

const backupEverything = (userID, callbackFunction, addToRoot, id) => {
    const now = new Date().yyyymmdd();
    backupHelper({
        uri: config.get('MONGOURI'), 
        root: __dirname + '/../../backups/' + addToRoot,
        callback: callbackFunction,
        tar: userID + '-' + now + '.tar',
    });
    backupFiles('../../backups/' + addToRoot + userID + '-' + now, id); 
    return '../../backups/' + addToRoot + userID + '-' + now + '.tar';
};

const backupCollections = (userID, collectionsList, callbackFunction, addToRoot, id) => {
    const now = new Date().yyyymmdd();
    backupHelper({
        uri: config.get('MONGOURI'), 
        root: __dirname + '/../../backups' + addToRoot,
        collections: collectionsList,
        callback: callbackFunction,
        tar: userID + '-' + now + '.tar',
    });
    for (const col in collectionsList) {
        if (col === 'file') {
            backupFiles('../../backups' + addToRoot + userID + '-' + now, id);
        }
    }
    return '../../backups' + addToRoot + userID + '-' + now + '.tar';
};

module.exports = {
    backupEverything,
    backupCollections,
};
