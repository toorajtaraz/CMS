const restoreHelper = require('mongodb-restore');
const config = require('config');
const unzipper = require('unzipper');
const fs = require('fs');



const restore = (adminUser, toBeDropped, callbackFunction, restoreFileName, dropFlag) => {
    if (restoreFileName.hasZip) {
        fs.rmdir(__dirname + '/../../static', { recursive: true, force: true }, (err) => {
            if (err) {
                console.log('went wrong');
                return;
            } 
        fs.createReadStream(__dirname + '/../../backups/zip/' + restoreFileName.zip)
            .pipe(unzipper.Extract({ path: __dirname + '/../../static' }));            
        }); 
    }
    if (dropFlago) {
        restoreHelper({
            uri: config.get('MONGOURI'), 
            root: __dirname +  '/../../backups',
            drop: true,
            tar: restoreFileName.tar,
            callback: callbackFunction,
        });
    }
    else {
        restoreHelper({
            uri: config.get('MONGOURI'), 
            root: __dirname +  '/../../backups',  
            dropCollections: toBeDropped,
            tar: restoreFileName.tar,
            callback: callbackFunction,
        });
    }
}

module.exports = restore;
