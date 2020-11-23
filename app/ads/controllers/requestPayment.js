const {ok, error} = require('../../../core/tools/response');
const checkout = require('zarinpal-checkout').create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);
const services = require('../services/requestPayment');


/**
 * @api {get} /api/pay/:id requestPayment
 * @apiName requestPayment
 * @apiDescription Request Payment: send the ad ID to this endpoint to start the payment process, result.url is the gateway address
 * @apiGroup ads
 * @apiSuccessExample {json} success-response:{
    "status": "ok",
    "message": {
        "en": "Request was successful",
        "fa": "درخواست موفقیت آمیز بود"
    },
    "result": {
        "ad": {
            "duration": 30,
            "discount": 0,
            "payed": false,
            "payedOn": null,
            "receipt": "5fbbc40dcb11c24394e5ace4",
            "_id": "5fbbb4e9a579ed3bdc32067e",
            "name": "something",
            "body": "some text",
            "type": "5fbbb1e5a579ed3bdc32067d",
            "start": "2020-11-25",
            "end": "2020-12-25",
            "cost": 30000,
            "savedOn": "2020-11-23T13:11:05.928Z",
            "__v": 0
        },
        "url": "https://sandbox.zarinpal.com/pg/StartPay/000000000000000000000000000000172128"
    }
}
 *
 */
const requestPayment = async (req, res, next) => {
    const adId = req.params.id;
    let ad = await services.getAd(adId);
    const zarinResponse = await checkout.PaymentRequest({
        Amount: (ad.cost - ad.discount).toString(10),
        // TODO this must change and become the verification page
        CallbackURL: `localhost:8000/api/ads/verifyPayment/${ad._id}`,
        Description: 'testing ad payment',
        Email: 'hamedghochanian@gmail.com',
        Mobile: '09152015593'
    })
    console.log(zarinResponse);
    ad = await services.giveAdaReceipt(adId, zarinResponse.authority, ad.cost - ad.discount);
    console.log(ad)
    return ok(res, {ad, url: zarinResponse.url});
}

module.exports = requestPayment;
