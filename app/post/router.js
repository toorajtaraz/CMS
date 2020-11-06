const controller = require('./controllers');

module.exports = (app, router) => {
    app.post('/api/posts',controller.create);
    app.put('/api/posts/:id',controller.update);
    app.get('/api/posts/:id', controller.fetch);
    app.get('/api/posts', controller.all);
    app.delete('/api/posts/:id', controller.delete);
};
