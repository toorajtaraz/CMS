const { ok, error } = require('../../../core/tools/response');
const deleteService = require('../services/delete');

/**
 * @api {delete} /api/restore/:id Requests canceling a request
 * @apiName CancelRestore
 * @apiGroup restore
 * @apiSuccessExample success_canceling:
{
    "status": "ok",
    "message": {
        "en": "restore successfully removed from restore Q",
        "fa": "بازنشانی با موفقیت از صف حذف شد"
    },
    "result": {
        "state": -1,
        "date": "2020-11-14T19:24:50.358Z",
        "_id": "5fb02f7a458dac29adaaeafc",
        "owner": "5faafe179d8f4f684c3543d3",
        "fileName": "5faa91345953e633c9686379"
    }
}
 *@apiErrorExample {json} not_found:
{
    "status": "error",
    "message": {
        "en": "restore does not exist!",
        "fa": "بازنشانی پیدا نشد"
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
        "fa": "بازنشانی به شما تعلق ندارد"
    }
}
    */

const cancelRestore = async (request, response, next) => {
    const status = await deleteService.possible(request.user._id, request.params.id);
    if (!status.possible) {
        return error(response, 400, status.log);
    }
    let canceledRestore = await deleteService.removeFromRestoreQ(request.params.id);
    if (!canceledRestore) {
        return error(response, 500, { en: 'something went wrong' });
    }
    canceledRestore = canceledRestore.toObject();
    delete canceledRestore.__v;
    return ok(response, canceledRestore, {
        en: 'restore successfully removed from restore Q',
        fa: 'بازنشانی با موفقیت از صف حذف شد',
    }, 200);
};

module.exports = {
    cancelRestore
};
