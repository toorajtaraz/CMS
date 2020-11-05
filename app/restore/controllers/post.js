const { ok, error } = require('../../../core/tools/response');
const validator = require('../../../core/tools/validator');
const postService = require('../services/post');
const postSchema = require('../schemas/post');

const addToRestoreQ = async (request, response, next) => {
    if (request.user.attempts === 3) {
        await postService.banUser(request.user._id);
        return error(response, 429, { en: 'slow down buddy :)' });
    }
    if (await postService.isBanned(request.user._id)) {
        return error(response, 429, { en: 'slow down buddy :)' });
    }
    const validate = validator(postSchema, request.body);

    if (validate.failed) {
        return validate.response(response);
    }
    if ((await postService.canAccess(validate.data.password)) === false) {
        request.user.attempts += 1;
        await request.user.save();
        return error(response, 400, { en: 'provided password was not correct.' });
    }
    let createdRestore = await postService.addToRestoreQ(request.user._id, validate.data);
    createdRestore = createdRestore.toObject();
    delete createdRestore.__v;
    return ok(response, createdRestore, {
        en: 'restore successfully added to restore Q',
        fa: '',
    }, 200);
};

module.exports = addToRestoreQ;


