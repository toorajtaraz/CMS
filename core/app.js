const config = require('config');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { errorHandler } = require('./tools/handleError');
const express = require('express');
const identifyUser = require('./middleware/userMiddleware');
const identifyAdmin = require('./middleware/checkSuperUser');


exports.init = (app, router, connection) => {
    process.env.TZ = 'Asia/Tehran';
    console.log("" + new Date());
    app.use(bodyParser.json())
        .use(bodyParser.urlencoded({extended:false}));
    app.use('/api/restore/upload' ,fileUpload({
        createParentPath: true,
    }));
    app.use(cors());

    //TODO if your module needs user auth, add it here
    app.use('/api/ads',identifyUser);
    app.use('/api/posts',identifyUser);
    app.use('/api/settings', identifyUser);
    app.use('/api/restore', identifyUser);
    app.use('/api/backup', identifyUser);

    //checking admin access
    app.use('/api/backup', identifyAdmin);
    app.use('/api/restore', identifyAdmin);
    app.use('/api/settings', identifyAdmin);

    app.use('/api', router);
    app.get('/apidoc', (req, res) => {
        res.sendFile(path.join(__dirname, '../apidoc/index.html'));
    });
}

exports.run = (app) => {
    console.log(`*** ${String(config.get('LEVEL')).toUpperCase()} ***`);

    app.use('/doc', express.static(path.join(__dirname, '../apidoc'), { fallthrough: false }));
    app.use('/backups', express.static(path.join(__dirname, '../backups'), { fallthrough: false }));
    app.use(errorHandler);
    app.listen(config.get('PORT'), () => {
        console.log(`server is running on port ${config.get('PORT')}`);
    });
}
