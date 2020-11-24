const { ok, error } = require('../../../core/tools/response');
const validator = require('../../../core/tools/validator');
const postService = require('../services/post');
const postSchema = require('../schemas/post');
const { increaseAttempts } = require('../../user/services/attempts');
/**
 * @api {post} /api/settings/initiateBR initiates BACKUP/RESTORE deamon
 * @apiName initiateDeamon
 * @apiGroup Settings
 * @apiDescription it will initiate BR deamon to pressess backup and restore Q.
 * @apiParam {String} password settings password (REQUIRED)
 * @apiSuccessExample {json} success-response-initiate:
    {
        "status": "ok",
        "message": {
            "en": "backup/restore deamon initiated",
            "fa": "درخواست موفقیت آمیز بود"
        },
        "result": {}
    }
 **/

/**
 * @api {post} /api/settings/updateSettings update settings
 * @apiName updateSettings
 * @apiDescription do some settings related stuff
 * @apiGroup Settings
 * @apiParam {String} password settings password (REQUIRED)
 * @apiParam {String} newPassword updates settings password 
 * @apiParam {String} newPath new sand boxed path to store backups 
 * @apiParam {Array} collections array of strings which are name of collections that automated backup will take care of.
 * @apiSuccessExample {json} success-response-update:
{
    "status": "ok",
    "message": {
        "en": "settings successfully updated",
        "fa": "تنظیمات با موفقیت به روزرسانی شد"
    },
    "result": {
        "sandBoxedPath": "testpath/innerTestPath",
        "last_update": "2020-11-24T16:57:51.116Z",
        "collections": [
            "Role",
            "Post"
        ],
        "_id": "5fb02e468a6dea27eafe4c28"
    }
}
    */

const initiateBR = async (request, response, next) => {
    if (request.user.attempts === 3) {
        await postService.banUser(request.user._id);
        return error(response, 429, { en: 'slow down buddy :)', fa: 'ای ساربان آهسته ران'});
    }
    if (await postService.isBanned(request.user._id)) {
        return error(response, 429, { en: 'slow down buddy :)', fa: 'ای ساربان آهسته ران'});
    }
    if ((await postService.canAccess(request.body.password ? request.body.password : '')) === false) {
        await increaseAttempts(request.user._id, request.user.attempts);
        return error(response, 400, { en: 'provided password was not correct.', fa: 'رمز عبور نا درست بود'});
    } else if (request.user.attempts > 0) {
        await increaseAttempts(request.user._id, -1);
    }
    postService.initiateBR();
    return ok(response, {}, {
        en: 'backup/restore deamon initiated',
        fa: '',
    }, 200);
};


const updateSettings = async (request, response, next) => {
    if (request.user.attempts === 3) {
        await postService.banUser(request.user._id);
        return error(response, 429, { en: 'slow down buddy :)', fa: 'ای ساربان آهسته ران'});
    }
    if (await postService.isBanned(request.user._id)) {
        return error(response, 429, { en: 'slow down buddy :)', fa: 'ای ساربان آهسته ران'});
    }
    const validate = validator(postSchema, request.body);

    if (validate.failed) {
        return validate.response(response);
    }
    if ((await postService.canAccess(validate.data.password)) === false) {
        await increaseAttempts(request.user._id, request.user.attempts);
        return error(response, 400, { en: 'provided password was not correct.', fa: 'رمز عبور نا درست بود'});
    } else if (request.user.attempts > 0) {
        await increaseAttempts(request.user._id, -1);
    }
    let updatedSettings = await postService.updateSettings(request.user._id, validate.data);
    updatedSettings = updatedSettings.toObject();
    delete updatedSettings.__v;
    delete updatedSettings.passwordHash;
    return ok(response, updatedSettings, {
        en: 'settings successfully updated',
        fa: 'تنظیمات با موفقیت به روزرسانی شد',
    }, 200);
};


module.exports = {
    updateSettings,
    initiateBR
};
