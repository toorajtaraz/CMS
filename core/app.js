const config = require('config');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { errorHandler } = require('./tools/handleError');
const express = require('express');



exports.init = (app, router, connection) => {
    app.use(bodyParser.json())
        .use(bodyParser.urlencoded({extended:false}));
    app.use(fileUpload({
        createParentPath: true,
    }));
    app.use(cors());
    app.use('/api', router);
    app.get('/apidoc', (req, res) => {
        res.sendFile(path.join(__dirname, '../apidoc/index.html'));
    });
}

exports.run = (app) => {
    console.log(`*** ${String(config.get('LEVEL')).toUpperCase()} ***`);

    app.use(express.static(path.join(__dirname, '../apidoc'), { fallthrough: false }));
    app.use(errorHandler);
    app.listen(config.get('PORT'), () => {
        console.log(`server is running on port ${config.get('PORT')}`);
    });
}
