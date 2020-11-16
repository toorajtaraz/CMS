const {ok, error} = require('../../../core/tools/response');
const ajv = require('ajv')({allErrors: true});
const validationSchema = require('../schemas/search');
const service = require('../services/search');

function validateData(data) {
    const valid =  ajv.validate(validationSchema, data);
    if (!valid)
        return {valid: false, error: ajv.errors};
    return {valid: true}
}

/**
 * @api {post} /api/posts/search/ Search
 * @apiName Search
 * @apiGroup Posts
 * 
 * @apiParam {Number} [page=1] Page number to show
 * @apiParam {Number} [size=10] Number of items per page
 * @apiParam {String} searchTerms Phrase or terms to search by
 * @apiParam {String[]} [tags] Tags to filter
 * @apiParam {String} [author] Author id to filter posts
 * @apiParam {Boolean} [published] Published status to filter posts by (only for authorized users)
 * 
 * @apiParamExample Request-Example:
 * {
 *    "page": 2,
 *    "size": 3,
 *    "tags": [ "برچسب" ],
 *    "searchTerms": "سلام زندگی"
 * }
 * 
 * @apiSuccess (200) {Object[]} result.posts Posts information
 * @apiSuccess (200) {Number} result.pageCount Page count for current criteria
 * @apiSuccessExample Success-Response:
 * {
 *     "status": "ok",
 *     "message": {
 *         "en": "Search results:",
 *         "fa": "نتیجه جست‌وجو:"
 *     },
 *     "result": {
 *         "posts": [
 *             {
 *                 "published": false,
 *                 "editedBy": [
 *                     {
 *                         "_id": "5fb1935573faa36ad4fcb87b",
 *                         "username": "fooUser"
 *                     }
 *                 ],
 *                 "tags": [
 *                     "تگ",
 *                     "برچسب"
 *                 ],
 *                 "is_deleted": false,
 *                 "_id": "5fb24552371693522042d8ba",
 *                 "title": "سلام زندگی",
 *                 "content": "به زندگی سلام کنیم.",
 *                 "summary": "خلاصه",
 *                 "datePosted": "2020-11-16",
 *                 "author": {
 *                     "_id": "5fb1935573faa36ad4fcb87b",
 *                     "username": "fooUser"
 *                 },
 *                 "__v": 0,
 *                 "dateUpdated": "2020-11-16",
 *                 "score": 1.375
 *             }
 *         ],
 *         "pageCount": 1
 *     }
 * }
 * 
 * @apiError (400) {Object} BadRequest Invalid parameters
 * @apiError (404) {Object} NotFound No Post Found
 * @apiErrorExample NotFound
 * HTTP/1.1 404 No Post Found
 *  {
 *     "status": "error",
 *     "message": {
 *         "en": "No matching posts found.",
 *         "fa": "پستی با این مشخصات یافت نشد."
 *     }
 * }
 */

const all = async (request, response, next) => {
    const data = request.body;
    // check auth for unpublished posts
    const user = request.header('user');
    
    const validationRes = validateData(data);
    if (!validationRes.valid)
    return error(response, 400, {
        en: validationRes.error
    });

    const result = await service(data, user);
    
    if (result.posts[0] === undefined) return error(response, 404, {
        en: 'No matching posts found.',
        fa: 'پستی با این مشخصات یافت نشد.'
    });
    return ok(response, result, {
        en: 'Search results:',
        fa: 'نتیجه جست‌وجو:'
    });
}

module.exports = all;
