const { ok, error } = require('../../../core/tools/response');
const validator = require('../../../core/tools/validator');
const postService = require('../services/post');
const postSchema = require('../schemas/post');

const addToBackupQ = async (request, response, next) => {
    const validate = validator(postSchema, request.body);

    if (validate.failed) {
        return validate.response(response);
    }

    let createdBackup = await postService.addToBackupQ(request.user._id, validate.data);
    createdBackup = createdBackup.toObject();
    delete createdBackup.__v;
    return ok(response, createdBackup, {
        en: 'backup successfully added to backup Q',
        fa: '',
    }, 200);
};

module.exports = addToBackupQ;

