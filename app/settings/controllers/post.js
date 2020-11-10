const { ok, error } = require('../../../core/tools/response');
const validator = require('../../../core/tools/validator');
const postService = require('../services/post');
const postSchema = require('../schemas/post');
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
 * @apiSuccessExample {json} success-response-update:
 {
    "status": "ok",
    "message": {
        "en": "settings successfully updated",
        "fa": "درخواست موفقیت آمیز بود"
    },
    "result": {
        "sandBoxedPath": "",
        "last_update": "2020-11-09T14:10:30.577Z",
        "_id": "5fa94d6a807add4ac9ce49a0"
    }
}
    */

const initiateBR = async (request, response, next) => {
    if (request.user.attempts === 3) {
        await postService.banUser(request.user._id);
        return error(response, 429, { en: 'slow down buddy :)' });
    }
    if (await postService.isBanned(request.user._id)) {
        return error(response, 429, { en: 'slow down buddy :)' });
    }
    if ((await postService.canAccess(request.body.password ? request.body.password : '')) === false) {
        request.user.attempts += 1;
        await request.user.save();
        return error(response, 400, { en: 'password was not provided or it was not correct' });
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
        return error(response, 429, { en: 'slow down buddy :)' });
    }
    if (await postService.isBanned(request.user._id)) {
        return error(response, 429, { en: 'slow down buddy :)' });
    }
    const validate = validator(postSchema, request.body);

    if (validate.failed) {
        return validate.response(response);
    }
    if ((await postService.canAccess(validate.data.password)) === false) {
        request.user.attempts += 1;
        await request.user.save();
        return error(response, 400, { en: 'provided password was not correct.' });
    }
    let updatedSettings = await postService.updateSettings(request.user._id, validate.data);
    updatedSettings = updatedSettings.toObject();
    delete updatedSettings.__v;
    delete updatedSettings.passwordHash;
    return ok(response, updatedSettings, {
        en: 'settings successfully updated',
        fa: '',
    }, 200);
};


module.exports = {
    updateSettings,
    initiateBR
};
