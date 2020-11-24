const backupHelper = require('./backupRestoreSpawn').backup;
const config = require('config');
const fs = require('fs');
const archiver = require('archiver');
const { Backup } = require('../models/backup');
const backupFiles = async (name, id) => {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(process.cwd() + '/backups/' + name + '.zip');
        const archive = archiver('zip');
        archive.on('error', reject);
        output.on('close', function () {
            Backup.findByIdAndUpdate(id, {downloadLinkZip: name + '.zip'})
                .then(resolve, reject);
        });
        archive.pipe(output);
        archive.directory(__dirname + '/../../static', false);
        archive.finalize();
    });
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
    const nowmill = Date.now(); 
    backupFiles(addToRoot + userID + '-' + nowmill + '-' + now, id).then(()=> {
        backupHelper({
            uri: config.get('MONGOURI'), 
            root: __dirname + '/../../backups/' + addToRoot,
            callback: callbackFunction,
            tar: userID + '-' + nowmill + '-' + now + '.tar',
            addToRoot: addToRoot
        });
    }, callbackFunction);
    return addToRoot + userID + '-' + nowmill + '-' + now + '.tar';
};

const backupCollections = (userID, collectionsList, callbackFunction, addToRoot, id) => {
    const now = new Date().yyyymmdd();
    const nowmill = Date.now();

    for (const col in collectionsList) {
        if (col === 'File') {
            backupFiles(addToRoot + userID + '-' + nowmill + '-' + now, id).then(
                () => {
                    restoreHelper({
                        uri: config.get('MONGOURI'),
                        root: __dirname +  '/../../toBeRestored/',
                        tar: restoreFileName.tar,
                        callback: callbackFunction,
                    });
                }, callbackFunction
            );
            return addToRoot + userID + '-' + nowmill + '-' + now + '.tar';
        }
    }
    restoreHelper({
        uri: config.get('MONGOURI'),
        root: __dirname +  '/../../toBeRestored/',
        tar: restoreFileName.tar,
        callback: callbackFunction,
    });
    return addToRoot + userID + '-' + nowmill + '-' + now + '.tar';
};

module.exports = {
    backupEverything,
    backupCollections,
};
