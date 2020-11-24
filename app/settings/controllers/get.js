const { ok } = require('../../../core/tools/response');
const getService = require('../services/get');
/**
 * @api {get} /api/settings Requests current settings
 * @apiName getSettings
 * @apiGroup Settings
 * @apiSuccessExample success_getting_settings:
 {
    "status": "ok",
    "message": {
        "en": "settings successfully updated",
        "fa": "تنظیمات با موفقیت به روزرسانی شد"
    },
    "result": {
        "sandBoxedPath": "testpath/innerTestPath",
        "last_update": "2020-11-24T16:40:50.256Z",
        "collections": [
            "Role",
            "Post"
        ],
        "_id": "5fb02e468a6dea27eafe4c28"
    }
}
    */
const getSettings = async (request, response, next) => {
    try {
        let settings = await getService();
        settings = settings.toObject();
        delete settings.__v;
        delete settings.passwordHash;
        delete settings._id;
        return ok(response, settings, { en: 'Current Settings' , fa: 'تنظیمات فعلی'}, 200);
    } catch (err) {
        return next(err);
    }
};


module.exports = {
    getSettings
};
