const controllers = require('./controllers');
const fileUpload = require('express-fileupload')();

module.exports = (router) => {
    router.post('/restore', controllers.post);
    router.get('/restore', controllers.get.getAllRestores);
    router.post('/restore/ping',  controllers.ping.pong);
    router.post('/restore/upload',  controllers.upload);
};
