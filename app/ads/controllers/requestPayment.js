const {ok, error} = require('../../../core/tools/response');
const checkout = require('zarinpal-checkout').create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);
const services = require('../services/requestPayment');


/**
 * @api {get} /api/pay/:id requestPayment
 * @apiName requestPayment
 * @apiDescription Request Payment: send the ad ID to this endpoint to start the payment process, it will open the zarinpal gateway and redirects you to google.com afterwards, after you make the payment landing page tell me and I'll change it
 * @apiGroup ads
 */
const requestPayment = async (req, res, next) => {
    const adId = req.params.id;
    let ad = await services.getAd(adId);
    const zarinResponse = await checkout.PaymentRequest({
        Amount: ad.cost - ad.discount,
        // TODO this must change and become the verification page
        CallbackURL: 'http://google.com',
        Description: 'testing ad payment',
        Email: 'hamedghochanian@gmail.com',
        Mobile: '09152015593'
    });
    ad = await services.giveAdaReceipt(adId, zarinResponse.authority, zarinResponse.amount);
    return ok(res, ad);
}

module.exports = requestPayment;
