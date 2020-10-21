const {ok, error} = require('../../../core/tools/response');
const services = require('./services');

const getByName = async (req,res,next)=>{
    const name = req.params.name;
    const coupon = await services.getCouponByName(name);
    if(!coupon){
        return error(res, 404);
    }
    return ok(res, coupon);
}