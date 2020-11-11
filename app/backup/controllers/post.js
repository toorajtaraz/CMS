const { ok, error } = require('../../../core/tools/response');
const validator = require('../../../core/tools/validator');
const postService = require('../services/post');
const postSchema = require('../schemas/post');
/**
 * @api {post} /api/backup request adding a backup to backup Q.
 * @apiName addToBackupQ
 * @apiDescription it creates a backup and then add it to Q. 0 for status means your backup has not yet been initiated, other negetive numbers mean failiure and 1 means in progress and finally 2 means finished successfully! 
 * @apiGroup restore
 * @apiParam {Boolean} is_full it means we want all things to be backed up!(REQUIRED)
 * @apiParam {Array}  collections list of collections you want to backup (you dont need to provide it if is_full is set to true).
 * @apiParam {String} collections.*.name name of collection 
 * @apiSuccessExample {json} success-response:
    {
        "status": "ok",
        "message": {
            "en": "backup successfully added to backup Q",
            "fa": "درخواست موفقیت آمیز بود"
        },
        "result": {
            "collections": null,
            "is_full": true,
            "state": 0,
            "date": "2020-11-10T13:38:47.089Z",
            "downloadLinkTar": "",
            "downloadLinkZip": "",
            "_id": "5faa97ffa188cc3fb18f23b8",
            "owner": "5fa94a1f11bd6c404245de88"
        }
    }
 * @apiErrorExample notEnoughParamsInBody:
    {
        "status": "error",
        "message": {
            "en": "Error in input validation!",
            "fa": "خطا در اعتبار سنجی داده های ورودی!"
        },
        "additionalInfo": {
            "is_full": "is_full is required."
        }
    }

    */



const addToBackupQ = async (request, response, next) => {
    const validate = validator(postSchema, request.body);

    if (validate.failed) {
        return validate.response(response);
    }

    let createdBackup = await postService.addToBackupQ(request.user._id, validate.data);
    createdBackup = createdBackup.toObject();
    delete createdBackup.__v;
    return ok(response, createdBackup, {
        en: 'backup successfully added to backup Q',
        fa: '',
    }, 200);
};

module.exports = addToBackupQ;

