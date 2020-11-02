const controllers = require('./controllers');
const auth = require('../../core/middleware/userMiddleware');

module.exports = (router) => {
    router.post('/restore', auth, controllers.post);
    router.get('/restore', auth, controllers.get.getAllRestores);
};
