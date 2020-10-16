const typesController = require('./types/controller');

module.exports = (app,router)=>{
    app.get('/ads/types',typesController.get);
};