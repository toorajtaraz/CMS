const controllers = require('./controllers');
const auth = require('../../core/middleware/userMiddleware');
const fileUpload = require('express-fileupload');

module.exports = (router) => {
    router.post('/restore', auth, controllers.post);
    router.get('/restore', auth, controllers.get.getAllRestores);
    router.get('/restore/ping', auth, fileUpload, controllers.ping);
    router.post('/restore/upload', auth, fileUpload, controllers.upload);
};
