const restoreHelper = require('./backupRestoreSpawn').restore;
const config = require('config');
const unzipper = require('unzipper');
const fs = require('fs');



const restore = (adminUser, callbackFunction, restoreFileName) => {
    if (restoreFileName.hasZip) {
        fs.rmdir(__dirname + '/../static', { recursive: true, force: true }, (err) => {
            if (err) {
                console.log('went wrong');
                return;
            }
        fs.createReadStream(restoreFileName.zip)
            .pipe(unzipper.Extract({ path: __dirname + '/../../static' }));            
        }); 
    }
    restoreHelper({
        uri: config.get('MONGOURI'), 
        root: __dirname +  '/../../backups/',
        tar: restoreFileName.tar,
        callback: callbackFunction,
    });
}

module.exports = restore;
