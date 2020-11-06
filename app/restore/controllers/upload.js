const { ok, error } = require('../../../core/tools/response');

const upload = async (request, response, next) => {
    let uploadPathTar;
    let uploadPathZip = '';
    if (!req.files || Object.keys(req.files).length === 0) {
        return error(response, 400, { en: 'No files were uploaded' });
    }
    const { files } = request;

    uploadPathTar = __dirname + '/../../../backups/' + files.tar.name;
    if (files.zip)
        uploadPathZip = __dirname + '/../../../backups/' + files.zip.name;

    files.tar.mv(uploadPathTar, function(err) {
        if (err) {
            return error(response, 500, { en: 'an error occured while saving uploaded file(s).' });
        }
        if (uploadPathZip != '') {
            files.zip.mv(uploadPathZip, function(err) {
                if (err) {
                    return error(response, 500, { en: 'an error occured while saving uploaded file(s).' });
                }
                    return ok(response, createdRestore, {
                        en: 'successfully uploaded!',
                        fa: '',
                    }, 200);
            });
        } 
        else
            return ok(response, {}, {
                en: 'successfully uploaded!',
                fa: '',
            }, 200);
    });
 };

module.exports = upload;


