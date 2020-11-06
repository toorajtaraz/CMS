const {ok, error} = require('../../../core/tools/response');
const ajv = require('ajv')({allErrors: true});
const service = require('../services/create');
const validationSchema = require('../schemas/create');
const debug = require('debug')('post:create');
const moment = require('moment');


function validateData(data) {
    const valid =  ajv.validate(validationSchema, data);
    if (!valid)
        return {valid: false, error: ajv.errors};
    return {valid: true}
}

/**
 * @api {post} /api/posts create
 * @apiName create
 * @apiGroup post
 * @apiVersion 1.0
 * 
 * @apiParam {String} title Post title
 * @apiParam {String} content Post content in markdown
 * @apiParam {String} datePosted Date to publish post
 * @apiParam {String} [summary=null] Post summary
 * @apiParam {Boolean} [published=true] Publish Status
 * @apiParam {String[]} tags Post tags by id 
 * 
 * @apiParamExample Request-Example:
 * {
 *  "title": "Lorem",
 *  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum quis lacus in laoreet. Nunc euismod in dolor in posuere. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque fermentum justo neque.",
 *  "summary": "a few words of summary",
 *  "datePosted": "2020-11-08",
 *  "published": true,
 *  "tags": [
 *      "tag1",
 *      "tag2"
 *  ]
 * }
 * @apiSuccess (200) {Object} result Post information
 * @apiSuccessExample Success-Response:
 * {
 *     "status": "ok",
 *     "message": {
 *         "en": "successfully posted.",
 *         "fa": "با موفقیت پست شد."
 *     },
 *     "result": {
 *         "published": true,
 *         "editedBy": [],
 *         "tags": [
 *             "tag1",
 *             "tag2"
 *         ],
 *         "is_deleted": false,
 *         "_id": "5fa514e3bfa0c645fc457884",
 *         "title": "Lorem",
 *         "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum quis lacus in laoreet. Nunc euismod in dolor in posuere. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque fermentum justo neque.",
 *         "summary": "a few words of summary",
 *         "datePosted": "2020-11-08",
 *         "author": "5fa44925d9d2fd1c84d6d18a",
 *         "__v": 0
 *     }
 * }
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
 * @apiError (400) {Object} BadRequest Invalid post date
 * @apiErrorExample BadRequest
 * HTTP/1.1 400 Date validation Error
 *  {
 *     "status": "error",
 *     "message": {
 *         "en": "invalid post date.",
 *         "fa": "تاریخ پست معتبر نیست."
 *     }
 * }
 * @apiErrorExample BadRequest
 * HTTP/1.1 400 Validation Error
 *  {
 *     "status": "error",
 *     "message": {
 *         "en": [
 *             {
 *                 "keyword": "required",
 *                 "dataPath": "",
 *                 "schemaPath": "#/required",
 *                 "params": {
 *                     "missingProperty": "datePosted"
 *                 },
 *                 "message": "should have required property 'datePosted'"
 *             }
 *         ],
 *         "fa": "درخواست موفقیت آمیز نبود!"
 *     }
 * }
 */

const create = async (request, response, next) => {
    const data = request.body;
    const result = validateData(data);
    // const user = request.user;
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
    if (!result.valid)
    return error(response, 400, {
        en: result.error
    });
    // validate dates
    let datePosted = moment(data.datePosted, 'YYYY-MM-DD', true);
    if (!datePosted.isValid()){
    return error(response, 400, {
            en: 'invalid post date.',
            fa: 'تاریخ پست معتبر نیست.',
        });
    }
    data.author = user;
    // debug(data);
    const post = await service.create(data);
    if (!post) return error(response, 500, {});
    return ok(response, post, {
        en: 'successfully posted.',
        fa: 'با موفقیت پست شد.',
    });

}

module.exports = create;
