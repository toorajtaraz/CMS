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
        "fa": "بازنشانی های درخواست شده در صفحه مورد نظر"
    },
    "result": {
        "items": [
            {
                "state": 2,
                "date": "2020-11-10T22:28:37.815Z",
                "_id": "5fab143baff21090c0948f21",
                "owner": "5faafe179d8f4f684c3543d3",
                "fileName": "5fab142eaff21090c0948f20"
            },
            {
                "state": -100,
                "date": "2020-11-14T19:21:47.493Z",
                "_id": "5fb02e622cedf0281de12b7c",
                "owner": "5faafe179d8f4f684c3543d3",
                "fileName": "5faa91345953e633c9686379"
            },
            {
                "state": -100,
                "date": "2020-11-14T19:24:50.358Z",
                "_id": "5fb02f0b458dac29adaaeafb",
                "owner": "5faafe179d8f4f684c3543d3",
                "fileName": "5faa91345953e633c9686379"
            },
            {
                "state": -100,
                "date": "2020-11-14T19:24:50.358Z",
                "_id": "5fb02f7a458dac29adaaeafc",
                "owner": "5faafe179d8f4f684c3543d3",
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
        return ok(response, { items: restores, pageCount }, { en: 'Requested restores in the given page', fa: 'بازنشانی های درخواست شده در صفحه مورد نظر'}, 200);
    } catch (err) {
        return next(err);
    }
};


module.exports = {
    getAllRestores,
};

