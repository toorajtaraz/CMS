const controller = require('./controllers');
const tagController = require('./controllers/tags');

module.exports = (router) => {
    router.post('/posts',controller.create);
    router.put('/posts/:id',controller.update);
    router.get('/posts/:id', controller.fetch);
    router.get('/posts', controller.all);
    router.delete('/posts/:id', controller.remove);
    router.get('/tags', tagController.all);
    router.post('/posts/search/', controller.search);
};
