const fs = require('fs');
const spawn = require('child_process').spawn;
const tar = require('tar');
const allCollections = JSON.parse(
    fs.readFileSync(__dirname + '/../../config/collections.json')
);
console.log(allCollections);
const backup = (config, _tar=tar) => {
    const {uri, root, collections, callback, tar} = config;
    const backupProcess = spawn(__dirname + '/../scripts/multipleColDump.sh', [
        collections ? collections.join(' ') : allCollections.join(' '),
        root + '/dump',
        uri,
    ]);
    backupProcess.on('exit', (code, signal) => {
        if (code) {
            console.log(code);
            callback(code);
            return;
        }
        if (signal) {
            console.log(signal);
            callback(signal);
            return;
        }
        _tar.create({
            file: root + tar,
            preservePaths: true,
        }, [
            root + '/dump',
        ], (err)=>{
            if (err) {
                console.log('something went wrong');
                console.log(err);
                callback(err);
                return;
            }
            fs.rmdir(root + '/dump', { recursive: true, force: true }, callback);
        });
    });
}

const restore = (config, _tar=tar) => {
    const {uri, root, collections, callback, tar} = config;
    _tar.extract({file: root + tar, preservePaths: true}).then(()=>{
        const restoreProcess = spawn('mongorestore', [
            '--authenticationDatabase=test',
            '--drop',
            '--uri=' + uri,
            root + '/dump',
        ]);
        restoreProcess.on('exit', (code, signal) => {
            if (code) {
                console.log(code);
                callback(code);
                return;
            }
            if (signal) {
                console.log(signal);
                callback(signal);
                return;
            }
            fs.rmdir(root + '/dump', { recursive: true, force: true }, callback);
        });
    });
};

module.exports = {
    backup,
    restore,
};
