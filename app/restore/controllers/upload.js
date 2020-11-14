const { ok, error } = require('../../../core/tools/response');
const postService = require('../services/post');
/**
 * @api {post} /api/restore/upload upload db files and static files
 * @apiName uploadFiles
 * @apiDescription stores and moves uploaded files to sandboxed path, you need to use the sent id in order to submit a restore request!
 * @apiGroup restore
 * @apiParam {File} tar tar file containing db files (should be provided as form-data/type=file REQUIRED)
 * @apiParam {File} zip zip file containing static (should be provided as form-data/type=file)
 * @apiSuccessExample {json} success-response:
    {
        "status": "ok",
        "message": {
            "en": "successfully uploaded!",
            "fa": "با موفقیت آپلود شد"
        },
        "result": {
            "id": "5faa8f74cb396931ee277f05"
        }
    }
 * @apiErrorExample noFileOrNoTar:
    {
        "status": "error",
        "message": {
            "en": "tar file (or possibly no file) were uploaded",
            "fa": "فایل الزامی آپلود نشده"
        }
    } 
    */
const upload = async (request, response, next) => {
    let uploadPathTar;
    let uploadPathZip = '';
    console.log(request.body);
    if (!request.files || !request.files.tar) {
        return error(response, 400, { en: 'tar file (or possibly no file) were uploaded', fa: 'فایل الزامی آپلود نشده'});
    }
    const { files } = request;
    const now = Date.now();
    uploadPathTar = __dirname + '/../../../backups/' + now + '-' +files.tar.name;
    if (files.zip)
        uploadPathZip = __dirname + '/../../../backups/' + now + '-' + files.zip.name;

    files.tar.mv(uploadPathTar, async function(err) {
        if (err) {
            return error(response, 500, { en: 'an error occured while saving uploaded file(s).' });
        }
        if (uploadPathZip != '') {
            files.zip.mv(uploadPathZip, async function(err) {
                if (err) {
                    return error(response, 500, { en: 'an error occured while saving uploaded file(s).' });
                }
                const restoreFile = await postService.createRestoreFile(now + '-' +files.tar.name, uploadPathZip); 
                return ok(response, {id: restoreFile._id}, {
                    en: 'successfully uploaded!',
                    fa: 'با موفقیت آپلود شد',
                }, 200);
            });
        } 
        else {
            const restoreFile = await postService.createRestoreFile(now + '-' +files.tar.name);
            return ok(response, {id: restoreFile._id}, {
                en: 'successfully uploaded!',
                fa: 'با موفقیت آپلود شد',
            }, 200);
        }
    });
 };

module.exports = upload;


