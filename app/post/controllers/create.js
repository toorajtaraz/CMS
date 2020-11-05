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
 * @api {post} /api/post create
 * @apiName create
 * @apiGroup post
 * @apiVersion 1.0
 * 
 * @apiParam {string} title Post title
 * @apiParam {string} content Post content in markdown
 * @apiParam {string} [summary] Post summary
 * @apiParam {string} datePosted Date to publish post
 * @apiParam {array} [tags] Post tags by id 
 * 
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
    let datePosted = moment(data.datePosted, 'YYYY-MM-DD');
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
