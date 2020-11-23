const {ok, error} = require('../../../../core/tools/response');
const ajv = require('ajv')({allErrors: true});
const validationSchema = require('../../schemas/tags/all');
const service = require('../../services/tags/all');

function validateData(data) {
    const valid =  ajv.validate(validationSchema, data);
    if (!valid)
        return {valid: false, error: ajv.errors};
    return {valid: true}
}

/**
 * @api {get} /api/tags All Tags
 * @apiName All Tags
 * @apiGroup Tags
 * 
 * @apiParam {Number} [page=1] Page number to show
 * @apiParam {Number} [size=20] Number of items per page
 * @apiParam {String} [sortBy="dateCreated"] Parameter to sort by
 * 
 * @apiParamExample Request-Example:
 * {
 *    "page": 2,
 *    "size": 3,
 *    "sortBy": "_id"
 * }
 * 
 * @apiSuccess (200) {Object[]} result.tags Tags information
 * @apiSuccess (200) {Number} result.tagsCount Number of posts with current critera
 * @apiSuccess (200) {Number} result.pageCount Page count for current criteria
 * @apiSuccessExample Success-Response:
 *  {
 *     "status": "ok",
 *     "message": {
 *         "en": "Tags retrieved.",
 *         "fa": "برچسب‌ها دریافت شد."
 *     },
 *     "result": {
 *         "tags": [
 *             {
 *                 "is_deleted": false,
 *                 "_id": "tag1",
 *                 "dateCreated": "2020-11-10",
 *                 "dateModified": "2020-11-10",
 *                 "__v": 0
 *             },
 *             {
 *                 "is_deleted": false,
 *                 "_id": "tag2",
 *                 "dateCreated": "2020-11-10",
 *                 "dateModified": "2020-11-10",
 *                 "__v": 0
 *             }
 *         ],
 *         "tagsCount": 12,
 *         "pageCount": 6
 *     }
 * }
 * 
 * @apiError (400) {Object} BadRequest Invalid parameters
 * @apiError (404) {Object} NotFound No tag found
 * @apiErrorExample NotFound
 * HTTP/1.1 404 No tag found
 *  {
    "status": "error",
    "message": {
        "en": "No tags found.",
        "fa": "برچسبی یافت نشد."
    }
}
 */

const all = async (request, response, next) => {
    const data = request.body;
    
    const validationRes = validateData(data);
    if (!validationRes.valid)
    return error(response, 400, {
        en: validationRes.error
    });

    const result = await service(data);
    
    if (result.tags[0] === undefined) return error(response, 404, {
        en: 'No tags found.',
        fa: 'برچسبی یافت نشد.'
    });
    return ok(response, result, {
        en: 'Tags retrieved.',
        fa: 'برچسب‌ها دریافت شد.'
    });
}

module.exports = all;
