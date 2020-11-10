const { ok } = require('../../../core/tools/response');
const { getAll, countAll } = require('../services/get');
/**
 * @api {get} /api/restore Requests a list of restores with given filters
 * @apiName getRestores
 * @apiGroup restore 
 * @apiParam {Number} state backup state,  for not initiated, -1 for in progress, 1 for completed 2 and -10 for failed(provided in query)
 * @apiParam {String} s_date restores since that date in js Date().toString format(provided in query)
 * @apiParam {String} e_date restores until that date in js Date().toString format(provided in query)
 * @apiParam {Number} size size of the page, set to 10 by default (provided in query)
 * @apiParam {Number} page set to 1 by default (provided in query)
 * @apiSuccessExample success_getting_list:
    {
        "status": "ok",
        "message": {
            "en": "Requested restores in the given page",
            "fa": "درخواست موفقیت آمیز بود"
        },
        "result": {
            "items": [
                {
                    "state": -1,
                    "date": "2020-11-10T13:09:09.926Z",
                    "_id": "5faa91425953e633c968637a",
                    "owner": "5fa94a1f11bd6c404245de88",
                    "fileName": "5faa91345953e633c9686379"
                }
            ],
            "pageCount": 1
        }
    }
    */

const getAllRestores = async (request, response, next) => {
    try {
        const size = request.query.size || 10;
        const page = request.query.page || 1;
        const pageCount = Math.ceil(await countAll(request.query) / size);
        const restores = await getAll(request.query, size, page);
        return ok(response, { items: restores, pageCount }, { en: 'Requested restores in the given page' }, 200);
    } catch (err) {
        return next(err);
    }
};


module.exports = {
    getAllRestores,
};

