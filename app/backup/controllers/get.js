const { ok } = require('../../../core/tools/response');
const { getAll, getAvailable, countAll, countAvailable} = require('../services/get');
/**
 * @api {get} /api/backup/all Requests a list of backups with given filters
 * @apiName getRestores
 * @apiGroup backup
 * @apiParam {Boolean} is_full says type of backup(provided in query)
 * @apiParam {Number} state backup state,  for not initiated, 0 for in progress, 1 for completed 2 and -10 for failed(provided in query)
 * @apiParam {String} s_date restores since that date in js Date().toString format(provided in query)
 * @apiParam {String} e_date restores until that date in js Date().toString format(provided in query)
 * @apiParam {Number} size size of the page, set to 10 by default (provided in query)
 * @apiParam {Number} page set to 1 by default (provided in query)
 * @apiSuccessExample success_getting_backups:
    {
        "status": "ok",
        "message": {
            "en": "Requested backups in the given page",
            "fa": "درخواست موفقیت آمیز بود"
        },
        "result": {
            "items": [
                {
                    "collections": null,
                    "is_full": true,
                    "state": 0,
                    "date": "2020-11-10T13:28:40.139Z",
                    "downloadLinkTar": "",
                    "downloadLinkZip": "",
                    "_id": "5faa95fa1b31b13bae5088a8",
                    "owner": "5fa94a1f11bd6c404245de88"
                }
            ],
            "pageCount": 1
        }
    }
    */
/**
 * @api {get} /api/backup/available Requests a list of available collections for backup
 * @apiName getAvailableBackups
 * @apiGroup backup
 * @apiSuccessExample success_getting_available_backups:
    {
        "status": "ok",
        "message": {
            "en": "Requested available backups",
            "fa": "درخواست موفقیت آمیز بود"
        },
        "result": [
            "Settings",
            "Backup",
            "Restore",
            "RestoreFiels",
            "Banned"
        ]
    }
    */

const getAllBackups = async (request, response, next) => {
    try {
        const size = request.query.size || 10;
        const page = request.query.page || 1;
        const pageCount = Math.ceil(await countAll(request.query) / size);
        const backups = await getAll(request.query, size, page);
        return ok(response, { items: backups, pageCount }, { en: 'Requested backups in the given page' }, 200);
    } catch (err) {
        return next(err);
    }
};

const getAvailableBackups = (request, response, next) => {
    try {
        const backups = getAvailable();
        return ok(response, backups, { en: 'Requested available backups' }, 200);
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getAllBackups,
    getAvailableBackups,
};
