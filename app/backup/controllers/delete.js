const { ok, error } = require('../../../core/tools/response');
const deleteService = require('../services/delete');

const cancelBackup = async (request, response, next) => {
    const status = await deleteService.possible(request.user._id, request.params.id);
    if (!status.possible) {
        return error(response, 400, { en: status.log }); 
    }
    let canceledBackup = await deleteService.removeFromBackupQ(request.params.id);
    if (!canceledBackup) {
        return error(response, 500, { en: 'something went wrong' }); 
    }
    canceledBackup = canceledBackup.toObject();
    delete canceledBackup.__v;
    return ok(response, canceledBackup, {
        en: 'backup successfully removed from backup Q',
        fa: '',
    }, 200);
};

module.exports = {
    cancelBackup,
};
