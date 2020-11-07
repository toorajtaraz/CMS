const controller = require('./controllers');

module.exports = (app, router) => {
    app.post('/posts',controller.create);
    app.put('/posts/:id',controller.update);
    app.get('/posts/:id', controller.fetch);
    app.get('/posts', controller.all);
    app.delete('/posts/:id', controller.remove);
};
