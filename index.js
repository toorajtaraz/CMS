const server = require('./bootstrap/server');

server.start()
    .then(() => {
        console.log('everything is good');
    });
