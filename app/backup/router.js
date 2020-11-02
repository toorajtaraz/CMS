const controllers = require('./controllers');
const auth = require('../../core/middleware/userMiddleware');

module.exports = (router) => {
    router.post('/backup', auth, controllers.post);
    router.get('/backup/available', auth, controllers.get.getAvailableBackups);
    router.get('/backup/all', auth, controllers.get.getAllBackups);
};
