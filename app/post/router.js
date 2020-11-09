const controller = require('./controllers');

module.exports = (router) => {
    router.post('/posts',controller.create);
    router.put('/posts/:id',controller.update);
    router.get('/posts/:id', controller.fetch);
    router.get('/posts', controller.all);
    router.delete('/posts/:id', controller.remove);
};
