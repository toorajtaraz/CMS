const Ajv = require('ajv');
const {error} = require('./response');
const ajv = new Ajv({allErrors: true})

module.exports = (schema, data, response) => {
    const valid = ajv.validate(schema, data)

    return {
        valid,
        data: data,
        errors: ajv.errors,
        response: (response) => error(
            response, 422, {en: "Error in input validation!", fa: "خطا در اعتبار سنجی داده های ورودی!"}, ajv.errors
        ),
    };
};
