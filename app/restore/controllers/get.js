const { ok } = require('../../../core/tools/response');
const { getAll, countAll } = require('../services/get');

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

