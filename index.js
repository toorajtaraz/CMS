const server  = require('./bootstrap/server');
const dir = __dirname;
server.start()
    .then(() => {
        console.log('everything is good');
    });

module.exports = dir;
