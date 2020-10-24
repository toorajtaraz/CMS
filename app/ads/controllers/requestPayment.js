const {ok, error} = require('../../../core/tools/response');
const checkout = require('zarinpal-checkout').create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);
const services = require('../services/requestPayment');

const requestPayment = async (req, res, next) => {
    const adId = req.params.id;
    let ad = await services.getAd(adId);
    const zarinResponse = await checkout.PaymentRequest({
        Amount: ad.cost - ad.discount,
        CallbackURL: 'http://google.com',
        Description: 'testing ad payment',
        Email: 'hamedghochanian@gmail.com',
        Mobile: '09152015593'
    });
    ad = await services.giveAdaReceipt(adId, zarinResponse.authority, zarinResponse.amount);
    return ok(res, ad);
}

module.exports = requestPayment;
