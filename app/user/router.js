const userController = require('./controllers');

module.exports = (app, router) => {
    app.get('/users', userController.get);
    app.post('/users',userController.create);
};