const typesController = require('./types/controller');
const couponController=require('./coupons/controllers')

module.exports = (app,router)=>{
    app.get('/ads/types',typesController.get);
    app.get('/ads/coupons/id/:id', couponController.getByCode);
    app.get('/ads/coupons/code/:code', couponController.getByCode);

};