const {ok, error} = require('../../../core/tools/response');
const ajv = require('ajv')({allErrors: true});
const service = require('../services/update');
const validationSchema = require('../schemas/update');


function validateData(data) {
    const valid =  ajv.validate(validationSchema, data);
    if (!valid)
        return {valid: false, error: ajv.errors};
    return {valid: true}
}

/**
 * @api {put} /api/posts Update
 * @apiName Update
 * @apiGroup Posts
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} [title] Post title
 * @apiParam {String} [content] Post content in markdown
 * @apiParam {String} [summary] Post summary
 * @apiParam {Boolean} [published] Publish Status
 * @apiParam {String[]} [tags] Post tags by id 
 * 
 * @apiParamExample Request-Example:
 *{
 *     "content": "Something radical is going on.",
 *     "summary": "shall we change?",
 *     "title": "A New Era",
 *     "tags": ["tech"]
 * }
 * @apiSuccess (200) {Object} result Updated post information
 * @apiSuccessExample Success-Response:
 {
    "status": "ok",
    "message": {
        "en": "successfully updated.",
        "fa": "پست به‌روز شد."
    },
    "result": {
        "published": true,
        "editedBy": [
            "5fa44925d9d2fd1c84d6d18a"
        ],
        "tags": [
            "tag1",
            "tag2",
            "tech"
        ],
        "is_deleted": false,
        "_id": "5fa514e3bfa0c645fc457884",
        "title": "A New Era",
        "content": "Something radical is going on.",
        "summary": "shall we change?",
        "datePosted": "2020-11-08",
        "author": "5fa44925d9d2fd1c84d6d18a",
        "__v": 0,
        "dateUpdated": "2020-11-07"
    }
}
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
        "en": "Post not found.",
        "fa": "پست یافت نشد."
    }
 * }
 * 
 */

const update = async (request, response, next) => {
    const data = request.body;
    const id = request.params.id;
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
    
    const post = await service.update(id, data, user);

    if (post === null) return error(response, 404, {
        en: 'Post not found.',
        fa: 'پست یافت نشد.'
    });

    return ok(response, post, {
        en: 'successfully updated.',
        fa: 'پست به‌روز شد.',
    });

}

module.exports = update;
