const { ok, error } = require('../../../core/tools/response');
const validator = require('../../../core/tools/validator');
const postService = require('../services/post');
const postSchema = require('../schemas/post');
/**
 * @api {post} /api/restore request adding a request to request Q.
 * @apiName addToRestoreQ
 * @apiDescription it uses your provided file id to create a restore and then add it to Q. 0 or -1 for status means your restore has not yet been initiated, other negetive numbers mean failiure and 1 means in progress and finally 2 means finished successfully! and at last you should know that you only have 3 chances for getting the password wrong, if you exceed your limit you get banned and you should wait a few minutes to get unblocked!
 * @apiGroup restore
 * @apiParam {String} file file id you get from upload endpoint.
 * @apiParam {String} password password min 6 characters (settings master password)
 * @apiSuccessExample {json} success-response:
{
    "status": "ok",
    "message": {
        "en": "restore successfully added to restore Q",
        "fa": "بازنشانی با موفقیت به صف افزوده شد"
    },
    "result": {
        "state": -1,
        "date": "2020-11-14T19:38:22.143Z",
        "_id": "5fb03234b125353203468aff",
        "owner": "5faafe179d8f4f684c3543d3",
        "fileName": "5faa91345953e633c9686379"
    }
}
 * @apiErrorExample wrongPassword:
{
    "status": "error",
    "message": {
        "en": "provided password was not correct.",
        "fa": "رمز عبور نا درست بود"
    }
}
 * @apiErrorExample toManyAttempt:
{
    "status": "error",
    "message": {
        "en": "slow down buddy :)",
        "fa": "ای ساربان آهسته ران"
    }
}
    */



const addToRestoreQ = async (request, response, next) => {
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
        request.user.attempts += 1;
        await request.user.save();
        return error(response, 400, { en: 'provided password was not correct.', fa: 'رمز عبور نا درست بود'});
    } else if (request.user.attempts > 0) {
        request.user.attempts = 0;
        await request.user.save();
    }
    let createdRestore = await postService.addToRestoreQ(request.user._id, validate.data);
    createdRestore = createdRestore.toObject();
    delete createdRestore.__v;
    return ok(response, createdRestore, {
        en: 'restore successfully added to restore Q',
        fa: 'بازنشانی با موفقیت به صف افزوده شد',
    }, 200);
};

module.exports = addToRestoreQ;


