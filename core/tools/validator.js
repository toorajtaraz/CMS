const validate = require('@alxgh/validate');
const { error } = require('./response');

module.exports = (schema, data, response) => {
    const { output, errors, failed } = validate(schema, data);

    return {
        failed,
        data: output,
        errors,
        response: (response) => error(
            response, 422, { en: "Error in input validation!", fa: "خطا در اعتبار سنجی داده های ورودی!" }, errors
        ),
    };
};
