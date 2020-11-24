const restoreHelper = require('./backupRestoreSpawn').restore;
const config = require('config');
const unzipper = require('unzipper');
const fs = require('fs');



const restore = (adminUser, callbackFunction, restoreFileName) => {
    if (restoreFileName.hasZip) {
        fs.rmdir(__dirname + '/../static', { recursive: true, force: true }, (err) => {
            if (err) {
                console.log("unpacking static dir went wrong!");
                callbackFunction(err);
                return;
            }
            fs.createReadStream(restoreFileName.zip)
                .pipe(unzipper.Extract({ path: __dirname + '/../../static' }))
                .promise()
                .then(
                    () => {
                        restoreHelper({
                            uri: config.get('MONGOURI'), 
                            root: __dirname +  '/../../toBeRestored/',
                            tar: restoreFileName.tar,
                            callback: callbackFunction,
                        });
                    },
                    callbackFunction
                );
        }); 
    } else {
        restoreHelper({
            uri: config.get('MONGOURI'), 
            root: __dirname +  '/../../toBeRestored/',
            tar: restoreFileName.tar,
            callback: callbackFunction,
        });
    }
}

module.exports = restore;
