const {ok, error} = require('../../../../core/tools/response');
const ajv = require('ajv')({allErrors: true});
const validationSchema = require('../../schemas/tags/update');
const service = require('../../services/tags/update');

function validateData(data) {
    const valid =  ajv.validate(validationSchema, data);
    if (!valid)
        return {valid: false, error: ajv.errors};
    return {valid: true}
}


/**
 * @api {put} /api/tags/:name Update
 * @apiName Update
 * @apiGroup Tags
 * 
 * @apiParam {String} name New tag name
 * 
 * @apiParamExample Request-Example:
 *{
 *     "name": "updatedTag1"
 * }
 * @apiSuccess (200) {Object} result Updated tag information
 * @apiSuccessExample Success-Response:
 * {
 *     "status": "ok",
 *     "message": {
 *         "en": "tag successfully updated.",
 *         "fa": "برچسب به‌روز شد."
 *     },
 *     "result": {
 *         "_id": "updatedTag1",
 *         "dateCreated": "2020-11-10",
 *         "dateModified": "2020-11-23"
 *     }
 * }
 * 
 * 
 * 
 * @apiError (403) {Object} Forbidden Access is denied
 * @apiErrorExample Forbidden
 * HTTP/1.1 403 Forbidden
 * {
 *     "status": "error",
 *     "message": {
 *         "en": "action is blocked.",
 *         "fa": "اجازه این عمل وجود ندارد."
 *     }
 * }
 * @apiError (400) {Object} BadRequest Invalid data
 * @apiError (404) {Object} NotFound Post not found
 * @apiErrorExample NotFound
 * HTTP/1.1 404 NotFound
 * {
 *  "status": "error",
    "message": {
        "en": "Tag not found.",
        "fa": "برچسب یافت نشد."
    }
 * }
 * 
 */

const update = async (request, response, next) => {
    const data = request.body;
    const id = request.params.name;
    const user = request.header('user');
    // check user access (block status)
    const hasAccess = await service.checkAccess(user);
    if (!hasAccess){
        return error(response, 403, {
            en: 'action is blocked.',
            fa: 'اجازه این عمل وجود ندارد.'
        });
    }
    // validate data
    const result = validateData(data);
    if (!result.valid)
    return error(response, 400, {
        en: result.error
    });
    
    const tag = await service.update(id, data);

    if (tag === null) return error(response, 404, {
        en: 'Tag not found.',
        fa: 'برچسب یافت نشد.'
    });

    return ok(response, tag, {
        en: 'tag successfully updated.',
        fa: 'برچسب به‌روز شد.',
    });

}

module.exports = update;
