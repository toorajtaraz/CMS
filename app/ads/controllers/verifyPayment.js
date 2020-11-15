const {ok, error} = require('../../../core/tools/response');
const checkout = require('zarinpal-checkout').create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);
const services = require('../services/verifyPayment');

/**
 * @api {get} /ads/verifyPayment/:id verifyPayment
 * @apiName verifyPayment
 * @apiDescription verify Payment: send the ad is to this endpoint to check if it's paid
 * @apiGroup ads
}
 */

const verifyPayment = async (req, res, next) => {
    const id = req.params.id;
    let ad = await services.getAd(id);
    const zarinResponse = await checkout.PaymentVerification({
        Amount: ad.receipt.amount,
        Authority: ad.receipt.authority,
    });
    if (zarinResponse.status === 101) {
        ad = await services.setAdSaved(ad._id);
        return ok(res, ad, ad);
    } else
        return error(res, 402, {en: "payment not verified"});
};

module.exports = verifyPayment;