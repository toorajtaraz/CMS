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
        "fa": "پشتیبان گیری های درخواست شده در صفحه مورد نظر"
    },
    "result": {
        "items": [
            {
                "collections": null,
                "is_full": true,
                "state": 2,
                "date": "2020-11-10T22:28:37.812Z",
                "downloadLinkTar": "../../backups/5faafe179d8f4f684c3543d3-20201111-1-58-47.tar",
                "downloadLinkZip": "../../backups/5faafe179d8f4f684c3543d3-20201111-1-58-47.zip",
                "_id": "5fab141baff21090c0948f1f",
                "owner": "5faafe179d8f4f684c3543d3"
            },
            {
                "collections": null,
                "is_full": true,
                "state": -100,
                "date": "2020-11-11T06:26:33.270Z",
                "downloadLinkTar": "",
                "downloadLinkZip": "",
                "_id": "5fab846b3d9cd2156a9efa6b",
                "owner": "5faafe179d8f4f684c3543d3"
            },
            {
                "collections": null,
                "is_full": true,
                "state": -100,
                "date": "2020-11-14T18:49:23.342Z",
                "downloadLinkTar": "",
                "downloadLinkZip": "",
                "_id": "5fb026d72efe9912837793e3",
                "owner": "5faafe179d8f4f684c3543d3"
            },
            {
                "collections": null,
                "is_full": true,
                "state": 0,
                "date": "2020-11-14T18:54:41.442Z",
                "downloadLinkTar": "",
                "downloadLinkZip": "",
                "_id": "5fb027fac4626416089bf666",
                "owner": "5faafe179d8f4f684c3543d3"
            },
            {
                "collections": null,
                "is_full": true,
                "state": -100,
                "date": "2020-11-14T18:54:57.410Z",
                "downloadLinkTar": "",
                "downloadLinkZip": "",
                "_id": "5fb028053f2fd3164f05469d",
                "owner": "5faafe179d8f4f684c3543d3"
            },
            {
                "collections": null,
                "is_full": true,
                "state": -100,
                "date": "2020-11-14T18:59:15.410Z",
                "downloadLinkTar": "",
                "downloadLinkZip": "",
                "_id": "5fb02920d07cfd195403281b",
                "owner": "5faafe179d8f4f684c3543d3"
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
        "fa": "مجموعه های قابل پشتیبان گیری"
    },
    "result": [
        "Settings",
        "Banned",
        "Post",
        "Tag",
        "User",
        "Role"
    ]
}
    */

const getAllBackups = async (request, response, next) => {
    try {
        const size = request.query.size || 10;
        const page = request.query.page || 1;
        const pageCount = Math.ceil(await countAll(request.query) / size);
        const backups = await getAll(request.query, size, page);
        return ok(response, { items: backups, pageCount }, { en: 'Requested backups in the given page' , fa: 'پشتیبان گیری های درخواست شده در صفحه مورد نظر'}, 200);
    } catch (err) {
        return next(err);
    }
};

const getAvailableBackups = (request, response, next) => {
    try {
        const backups = getAvailable();
        return ok(response, backups, { en: 'Requested available backups' , fa: 'مجموعه های قابل پشتیبان گیری'}, 200);
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getAllBackups,
    getAvailableBackups,
};
