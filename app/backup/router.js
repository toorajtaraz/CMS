const controllers = require('./controllers');

module.exports = (router) => {
    router.post('/backup', controllers.post);
    router.get('/backup/available', controllers.get.getAvailableBackups);
    router.get('/backup/all', controllers.get.getAllBackups);
};
