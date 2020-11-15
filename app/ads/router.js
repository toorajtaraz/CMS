const typesController = require('./types/controller');
const couponController = require('./coupons/controllers');
const adController = require('./controllers');

module.exports = (router) => {
    router.get('/ads/types', typesController.get);
    router.get('/ads/coupons/id/:id', couponController.getById);
    router.get('/ads/coupons/code/:code', couponController.getByCode);
    router.post('/ads', adController.create);
    router.get('/ads',adController.get);
    router.get('/ads/pay/:id', adController.requestPayment);
    router.get('/ads/verifyPayment/:id',adController.verifyPayment);
    router.post('ads/types', typesController.create);
};