const fs = require('fs');
const spawn = require('child_process').spawn;
const tar = require('tar');
const allCollections = JSON.parse(
    fs.readFileSync(__dirname + '/../../config/collections.json')
);
console.log(allCollections);
const backup = (config, _tar=tar) => {
    const {uri, root, collections, callback, tar, addToRoot} = config;
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
            file: './backups/' + addToRoot + tar,
            preservePaths: true,
            C: root
        }, [
            'dump',
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
    const extracted = _tar.extract({file: process.cwd() + '/toBeRestored/' + tar, cwd: process.cwd() + '/toBeRestored/'}, (err)=>{
        if (err) {
            return callback(err);
        }
        const restoreProcess = spawn('mongorestore', [
            '--authenticationDatabase=test',
            '--drop',
            '--uri=' + uri,
            root + 'dump',
        ]);
        restoreProcess.on('exit', (code, signal) => {
            if (code) {
                console.log('spawn restore went wrong  code = ' + code);
                callback(code);
                return;
            }
            if (signal) {
                console.log('spawn restore went wrong  signal = ' + signal);
                callback(signal);
                return;
            }
            fs.rmdir(root + 'dump', { recursive: true, force: true }, callback);
        });
    });
};

module.exports = {
    backup,
    restore,
};
