const { ok, error } = require('../../../core/tools/response');
const deleteService = require('../services/delete');

/**
 * @api {delete} /api/backup/:id Requests canceling a backup
 * @apiName CancelBackup
 * @apiGroup backup
 * @apiSuccessExample success_canceling:
{
    "status": "ok",
    "message": {
        "en": "backup successfully removed from backup Q",
        "fa": "درخواست پشتیبان گیری با موفقیت کنسل شد"
    },
    "result": {
        "collections": null,
        "is_full": true,
        "state": 0,
        "date": "2020-11-14T18:59:15.410Z",
        "downloadLinkTar": "",
        "downloadLinkZip": "",
        "_id": "5fb02920d07cfd195403281b",
        "owner": "5faafe179d8f4f684c3543d3"
    }
}
 *@apiErrorExample {json} not_found:
{
    "status": "error",
    "message": {
        "en": "backup does not exist!",
        "fa": "پشتیبان گیری پیدا نشد"
    }
}
 *@apiErrorExample {json} not_in_acceptable_state:
{
    "status": "error",
    "message": {
        "en": "current state can not be canceled",
        "fa": "شرایط فعلی قابل کنسل شدن نیست"
    }
}
 *@apiErrorExample {json} attemt_to_delete_other_admins_backup:
{
    "status": "error",
    "message": {
        "en": "you do not own it!",
        "fa": "این پشتیبان گیری به شما تعلق ندارد"
    }
}
    */

const cancelBackup = async (request, response, next) => {
    const status = await deleteService.possible(request.user._id, request.params.id);
    if (!status.possible) {
        return error(response, 400, status.log ); 
    }
    let canceledBackup = await deleteService.removeFromBackupQ(request.params.id);
    if (!canceledBackup) {
        return error(response, 500, { en: 'something went wrong' }); 
    }
    canceledBackup = canceledBackup.toObject();
    delete canceledBackup.__v;
    return ok(response, canceledBackup, {
        en: 'backup successfully removed from backup Q',
        fa: 'درخواست پشتیبان گیری با موفقیت کنسل شد',
    }, 200);
};

module.exports = {
    cancelBackup,
};
