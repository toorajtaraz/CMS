const backupHelper = require('mongodb-backup');
const config = require('config');

const backupEverything = (userID, callbackFunction) => {
    const now = new Date();
    backupHelper({
        uri: config.get('MONGOURI'), 
        root: __dirname + 'backups',
        callback: callbackFunction,
        tar: userID + '-' + now + '.tar', 
    });
};

const backupCollections = (userID, collectionsList, callbackFunction) => {
    const now = new Date();
    backupHelper({
        uri: config.get('MONGOURI'), 
        root: __dirname + 'backups',
        collections: collectionsList,
        callback: callbackFunction,
        tar: userID + '-' + now + '.tar', 
    });
};

module.exports = {
    backupEverything,
    backupCollections,
};
