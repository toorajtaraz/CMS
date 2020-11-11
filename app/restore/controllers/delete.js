const { ok, error } = require('../../../core/tools/response');
const deleteService = require('../services/delete');

const cancelRestore = async (request, response, next) => {
    const status = await deleteService.possible(request.user._id, request.params.id);
    if (!status.possible) {
        return error(response, 400, { en: status.log });
    }
    let canceledRestore = await deleteService.removeFromRestoreQ(request.params.id);
    if (!canceledRestore) {
        return error(response, 500, { en: 'something went wrong' });
    }
    canceledRestore = canceledRestore.toObject();
    delete canceledRestore.__v;
    return ok(response, canceledRestore, {
        en: 'backup successfully removed from restore Q',
        fa: '',
    }, 200);
};

module.exports = {
    cancelRestore
};
