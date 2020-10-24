const models = require('./models/model');
const {ok, error} = require('../../core/tools/response');
const hell = async (req, res, next) => {
    console.log("dude wtf?" )
    let a = new models.Coupon({
        code:'123abd',
        amount:10,
        isPercent:true,
        available: 10
    })

    let b=await a.save();
    console.log(b);
    console.log(a)
    return ok(res,b);
};

module.exports=hell;