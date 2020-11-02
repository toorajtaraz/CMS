const backupHelper = require('mongodb-backup');
const config = require('config');

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

const backupEverything = (userID, callbackFunction, addToRoot) => {
    const now = new Date().yyyymmdd();
    backupHelper({
        uri: config.get('MONGOURI'), 
        root: __dirname + '/../../backups' + addToRoot,
        callback: callbackFunction,
        tar: userID + '-' + now + '.tar', 
    });
    return '../../backups' + addToRoot + userID + '-' + now + '.tar';
};

const backupCollections = (userID, collectionsList, callbackFunction, addToRoot) => {
    const now = new Date().yyyymmdd();
    backupHelper({
        uri: config.get('MONGOURI'), 
        root: __dirname + '/../../backups' + addToRoot,
        collections: collectionsList,
        callback: callbackFunction,
        tar: userID + '-' + now + '.tar', 
    });
    return '../../backups' + addToRoot + userID + '-' + now + '.tar';
};

module.exports = {
    backupEverything,
    backupCollections,
};
