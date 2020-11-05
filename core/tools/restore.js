const restoreHelper = require('mongodb-restore');
const config = require('config');

const restore = (adminUser, toBeDropped, callbackFunction, restoreFileName, dropFlag) => {
    if (dropFlago) {
        restoreHelper({
            uri: config.get('MONGOURI'), 
            root: __dirname + 'backups',
            drop: true,
            tar: restoreFileName,
            callback: callbackFunction,
        });
    }
    else {
        restoreHelper({
            uri: config.get('MONGOURI'), 
            root: __dirname + 'backups',  
            dropCollections: toBeDropped,
            tar: restoreFileName,
            callback: callbackFunction,
        });
    }
}

module.exports = restore;
