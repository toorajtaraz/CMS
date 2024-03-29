const fs = require('fs');
const dateformat = require('dateformat');
const { error } = require('./response');

// eslint-disable-next-line no-unused-vars
exports.errorHandler = async (err, req, res, next) => {
    console.log(err)
    return error(res, 503, {en: 'something unexpected happend.'})
    // eslint-disable-next-line no-console
    console.log(err);
    let code = 500;

    if (Object.prototype.hasOwnProperty.call(err, 'code')) {
        code = err.code;
        // eslint-disable-next-line no-param-reassign
        err = err.error || 'something went wrong';
    }
    const date = dateformat(new Date(), 'yyyy-mm-dd');
    // Log the error
    fs.appendFileSync(`./logs/${date}.txt`,
        `${new Date()}: ${Object.prototype.hasOwnProperty.call(err, 'stack')? err.stack : err}\n`, 'utf8');

    // Send 500 error to client
    return error(res, code, { en: 'something unexpected happend.' });
};
