const {ok, error} = require('../../../core/tools/response');
const service = require('../services/remove');
const mongoose = require('mongoose');


/**
 * @api {delete} /api/post/:id 
 * @apiName remove
 * @apiGroup delete
 * @apiVersion 1.0
 * 
 * @apiSuccess (200) {Object} result Post information
 * @apiSuccessExample Success-Response:
 *  {
 *     "status": "ok",
 *     "message": {
 *         "en": "Post deleted.",
 *         "fa": "پست حذف شد."
 *     },
 *     "result": {
 *         "published": true,
 *         "editedBy": null,
 *         "tags": [
 *             "tag1",
 *             "tag2"
 *         ],
 *         "is_deleted": false,
 *         "_id": "5fa44729d9d2fd1c84d6d188",
 *         "title": "Lorem",
 *         "content": "ipsum",
 *         "summary": "summ",
 *         "datePublished": "2020-11-05",
 *         "dateUpdated": null,
 *         "author": null
 *     }
 * }
 * @apiError (403) {Object} Forbidden Unauthorized access
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

const remove = async (request, response, next) => {
    const id = request.params.id;
    // check auth
    const user = request.header('user');
    const access = await service.checkAccess(user);
    if(!access){
        return error(response, 403, {
            en: 'Acess denied.',
            fa: 'دسترسی غیر مجاز'
        })    
    }
    if (!mongoose.Types.ObjectId.isValid(id)){
        return error(response, 400, {
            en: 'Invalid id address.',
            fa: 'آدرس پست وارد شده معتبر نمی‌باشد.'
        })
    }
    const post = await service.remove(id);
    return ok(response, post, {
        en: 'Post deleted.',
        fa: 'پست حذف شد.'
    });
}

module.exports = remove;
