exports.ok = (response, data, message = {}, status = 200) => {
    const responseBody = {
        status: 'ok',
        message: {
            en: message.en || 'Request was successful',
            fa: message.fa || 'درخواست موفقیت آمیز بود',
        },
        result: data,
    };
    response.statusCode = status;
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(responseBody));
    response.end();
};

exports.error = (response, statusCode, message, additionalInfo=null) => {
    const responseBody = {
        status: 'error',
        message: {
            en: message.en || 'Request was not successful!',
            fa: message.fa || 'درخواست موفقیت آمیز نبود!',
        },
    };
    if (additionalInfo)
        responseBody.additionalInfo = additionalInfo;
    response.statusCode = statusCode;
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(responseBody));
    response.end();
};
