const controller = require('./controllers');
const tagController = require('./controllers/tags');

module.exports = (router) => {
    router.post('/posts',controller.create);
    router.put('/posts/:id',controller.update);
    router.get('/posts/:id', controller.fetch);
    router.post('/posts/getall', controller.all);
    router.delete('/posts/:id', controller.remove);
    router.post('/posts/search/', controller.search);
    router.get('/tags', tagController.all);
    router.put('/tags/:name', tagController.update);
};
