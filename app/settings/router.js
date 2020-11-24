const controllers = require('./controllers');
const auth = require('../../core/middleware/userMiddleware');
const fileUpload = require('express-fileupload')();

module.exports = (router) => {
    router.post('/settings/initiateBR', controllers.post.initiateBR);
    router.post('/settings/updateSettings', controllers.post.updateSettings);
    router.get('/settings', controllers.get.getSettings);
};
