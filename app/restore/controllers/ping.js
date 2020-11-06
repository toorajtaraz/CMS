const { ok } = require('../../../core/tools/response');

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

