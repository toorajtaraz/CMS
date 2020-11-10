const {ok, error} = require('../../../core/tools/response');
const ajv = require('ajv')({allErrors: true});
const service = require('../services/fetch');
const debug = require('debug')('post:fetch');
const mongoose = require('mongoose');


/**
 * @api {get} /api/post/:id Fetch
 * @apiName Fetch
 * @apiGroup Posts
 * @apiVersion 1.0.0
 * 
 * @apiSuccess (200) {Object} result Post information
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
 *                 "_id": "5fa44925d9d2a3ec84d6d18a",
 *                 "username": "jdoe"
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
    return ok(response, post, {});
}

module.exports = fetch;
