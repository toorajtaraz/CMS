const {ok, error} = require('../../../core/tools/response');
const ajv = require('ajv')({allErrors: true});
const service = require('../services/fetch');
const debug = require('debug')('post:fetch');
const mongoose = require('mongoose');


/**
 * @api {get} /api/posts/:id Fetch
 * @apiName Fetch
 * @apiGroup Posts
 * 
 * @apiSuccess (200) {Object} result Post information
 * @apiSuccessExample Success-Response:
 *  {
 *     "status": "ok",
 *     "message": {
 *         "en": "Post retrieved.",
 *         "fa": "پست دریافت شد."
 *     },
 *     "result": [
 *         {
 *             "published": false,
 *             "editedBy": [],
 *             "tags": [
 *                 "tag1",
 *                 "tag2"
 *             ],
 *             "is_deleted": false,
 *             "_id": "5fb7ab9e38246f3e7805005d",
 *             "title": "Brown Fox",
 *             "content": "Dolor sit.",
 *             "summary": null,
 *             "datePosted": "2020-11-20",
 *             "author": {
 *                 "_id": "5fb1935573faa36ad4fcb87b",
 *                 "username": "fooUser"
 *             },
 *             "__v": 0
 *         }
 *     ]
 * }
 * 
 * @apiError (400) {Object} BadRequest Invalid id format
 * @apiErrorExample BadRequest
 * HTTP/1.1 400 Invalid id format
 *  {
    "status": "error",
    "message": {
        "en": "Invalid id address.",
        "fa": "آدرس پست وارد شده معتبر نمی‌باشد."
    }
 * 
 * @apiError (404) {Object} NotFound Post not found
 * @apiErrorExample NotFound
 * HTTP/1.1 404 Post Not Found
 *  {
 *     "status": "error",
 *     "message": {
 *         "en": "Post not found.",
 *         "fa": "پست یافت نشد."
 *     }
 * }
 */

const fetch = async (request, response, next) => {
    const id = request.params.id;
    // check auth for unpublished posts
    const user = request.header('user');
    if (!mongoose.Types.ObjectId.isValid(id)){
        return error(response, 400, {
            en: 'Invalid id address.',
            fa: 'آدرس پست وارد شده معتبر نمی‌باشد.'
        })
    }
    const post = await service(id, user);
    if (post[0] === undefined) return error(response, 404, {
        en: 'Post not found.',
        fa: 'پست یافت نشد.'
    });
    return ok(response, post, {
        en: 'Post retrieved.', 
        fa: 'پست دریافت شد.'
    });
}

module.exports = fetch;
