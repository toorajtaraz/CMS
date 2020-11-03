const { ok } = require('../../../core/tools/response');
const { getAll, getAvailable, countAll, countAvailable} = require('../services/get');

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
