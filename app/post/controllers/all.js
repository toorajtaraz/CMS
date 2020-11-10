const {ok, error} = require('../../../core/tools/response');
const ajv = require('ajv')({allErrors: true});
const validationSchema = require('../schemas/all');
const service = require('../services/all');

function validateData(data) {
    const valid =  ajv.validate(validationSchema, data);
    if (!valid)
        return {valid: false, error: ajv.errors};
    return {valid: true}
}

/**
 * @api {get} /api/post All
 * @apiName All
 * @apiGroup Posts
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} [page=1] Page number to show
 * @apiParam {Number} [size=10] Number of items per page
 * @apiParam {String} [sortBy="datePosted"] Parameter to sort by
 * @apiParam {String[]} [tags] Tags to filter by
 * @apiParam {String} [author] Author id to filter posts by
 * @apiParam {Boolean} [published] Published status to filter posts by (only for authorized users)
 * 
 * @apiParamExample Request-Example:
 * {
 *    "page": 2,
 *    "size": 3,
 *    "tags": [ "tech", "tag1"],
 *    "author": "5fa514e3bfa0c645fc457884"
 * }
 * 
 * @apiSuccess (200) {Object[]} result Posts information
 * @apiSuccess (200) {Number} result.pageCount Page count for current criteria
 * @apiSuccessExample Success-Response:
 *  {
 *     "status": "ok",
 *     "message": {
 *         "en": "Request was successful",
 *         "fa": "درخواست موفقیت آمیز بود"
 *     },
 *     "result": [
 *         {
 *             "published": true,
 *             "editedBy": [],
 *             "tags": [
 *                 "tag1",
 *                 "tag2"
 *             ],
 *             "is_deleted": false,
 *             "_id": "5fa4720f874c045138412ffa",
 *             "title": "Lorem",
 *             "content": "ipsum",
 *             "summary": "summ",
 *             "datePosted": "2020-11-08",
 *             "author": {
 *                 "_id": "5fa44925d9d2fe2c84d6d18a",
 *                 "username": "jdoe"
 *             },
 *             "__v": 0
 *         },
 *         {
 *             "published": true,
 *             "editedBy": [],
 *             "tags": [
 *                 "tag1",
 *                 "tag2"
 *             ],
 *             "is_deleted": false,
 *             "_id": "5fa5b8d39630ff57c4638e96",
 *             "title": "Lorem",
 *             "content": "Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque fermentum justo neque.",
 *             "summary": "a few words of summary",
 *             "datePosted": "2020-11-08",
 *             "author": {
 *                 "_id": "5fa44925d9d2fd1c84d6d18a",
 *                 "username": "somebody"
 *             },
 *             "__v": 0
 *         }
 *     ]
 * }
 * 
 * @apiError (400) {Object} BadRequest Invalid parameters
 * @apiError (404) {Object} NotFound Post not found
 * @apiErrorExample NotFound
 * HTTP/1.1 404 Post Not Found
 *  {
    "status": "error",
    "message": {
        "en": "No posts found.",
        "fa": "پستی یافت نشد."
    }
}
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
        en: 'No posts found.',
        fa: 'پستی یافت نشد.'
    });
    return ok(response, result, {});
}

module.exports = all;
