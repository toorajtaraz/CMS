const { ok } = require('../../../core/tools/response');

/**
 * @api {post} /api/restore/ping check connection
 * @apiName ping
 * @apiDescription chechks connection and fileupload middleware!
 * @apiGroup restore
 * @apiSuccessExample {json} success-response: 
    {
        "status": "ok",
        "message": {
            "en": "Pong!",
            "fa": "درخواست موفقیت آمیز بود"
        },
        "result": {}
    }
    */

const pong =  (request, response, next) => {
    try {
        return ok(response, {}, { en: 'Pong!' }, 200);
    } catch (err) {
        return next(err);
    }
};


module.exports = {
    pong,
};

