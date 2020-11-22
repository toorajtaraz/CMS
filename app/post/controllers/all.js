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
 * @api {get} /api/posts All
 * @apiName All
 * @apiGroup Posts
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
 *    "page": 1
 *    "size": 2,
 *    "tags": [ "article", "tag1"],
 *    "author": "5fb1935573faa36ad4fcb87b"
 * }
 * 
 * @apiSuccess (200) {Object[]} result.posts Posts information
 * @apiSuccess (200) {Number} result.postsCount Number of posts with current critera
 * @apiSuccess (200) {Number} result.pageCount Page count for current criteria
 * @apiSuccessExample Success-Response:
 *  {
 *     "status": "ok",
 *     "message": {
 *         "en": "Retrieved posts",
 *         "fa": "پست‌ها دریافت شد."
 *     },
 *     "result": {
 *         "posts": [
 *             {
 *                 "published": true,
 *                 "editedBy": [
 *                     {
 *                         "_id": "5fb1935573faa36ad4fcb87b",
 *                         "username": "fooUser"
 *                     }
 *                 ],
 *                 "tags": [
 *                     "tag1",
 *                     "article"
 *                 ],
 *                 "is_deleted": false,
 *                 "_id": "5fb7ab8e38246f3e7805005b",
 *                 "title": "Lorem Ipsum",
 *                 "content": "Dolor sit.",
 *                 "summary": null,
 *                 "datePosted": "2020-11-20",
 *                 "author": {
 *                     "_id": "5fb1935573faa36ad4fcb87b",
 *                     "username": "fooUser"
 *                 },
 *                 "__v": 0,
 *                 "dateUpdated": "2020-11-22"
 *             },
 *             {
 *                 "published": false,
 *                 "editedBy": [],
 *                 "tags": [
 *                     "tag1",
 *                     "tag2"
 *                 ],
 *                 "is_deleted": false,
 *                 "_id": "5fb7ab9538246f3e7805005c",
 *                 "title": "Ipsum Lorem",
 *                 "content": "Quick brown fox jumped over sth.",
 *                 "summary": "a few words",
 *                 "datePosted": "2020-11-20",
 *                 "author": {
 *                     "_id": "5fb1935573faa36ad4fcb87b",
 *                     "username": "fooUser"
 *                 },
 *                 "__v": 0
 *             }
 *         ],
 *         "pageCount": 2,
 *         "postsCount": 3
 *     }
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
    return ok(response, result, {
        en: 'Retrieved posts',
        fa: 'پست‌ها دریافت شد.'
    });
}

module.exports = all;
