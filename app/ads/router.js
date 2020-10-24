const typesController = require('./types/controller');
const couponController = require('./coupons/controllers');
const adController = require('./controllers');


module.exports = (app, router) => {
    app.get('/ads/types', typesController.get);
    app.get('/ads/coupons/id/:id', couponController.getById);
    app.get('/ads/coupons/code/:code', couponController.getByCode);
    app.post('/ads', adController.create);
    app.get('/ads',adController.get);
    app.get('/ads/pay/:id', adController.requestPayment);
    app.get('')
};