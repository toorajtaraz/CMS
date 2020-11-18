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
 * @apiSuccessExample {json} success-response-update:
{
    "status": "ok",
    "message": {
        "en": "settings successfully updated",
        "fa": "تنظیمات با موفقیت به روزرسانی شد"
    },
    "result": {
        "sandBoxedPath": "",
        "last_update": "2020-11-14T19:49:36.189Z",
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

    // period input message?
    if((await postService.period_time_has_enterd (validate.data.newbackup_period_hours, validate.data.newbackup_period_days)) === false){ 
           return error(response, 4302, { en: 'please enter a time period.', fa: 'لطفا بازه زمانی را وارد کنید'});

     }

     if((await postService.period_hours_accepted (validate.data.newbackup_period_hours)) === false){ 
        return error(response, 431, { en: 'please enter period hours between 0-23.', fa: 'لطفا بازه زمانی بین 0 تا 23 ساعت وارد کنید'});

     }

     if((await postService.period_days_accepted (validate.data.newbackup_period_days)) === false){ 
        return error(response, 432, { en: 'please enter period days between 0-30.', fa: 'لطفا بازه زمانی بین 0 تا 30 روز وارد کنید'});

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
