BASEDIR = `${__dirname}/..`;
process.env.NODE_CONFIG_DIR = `${BASEDIR}/config`;

const fs = require('fs');
const express = require('express');

const init = require('./init');
const app = express();
const handler = require('../core/app');
const router = express.Router();
const { run } = require('../core/db/mongoose');
const rbd = require('../core/tools/BRD');

const start =  async () => {
    const connection = await run();
    handler.init(app, router, connection);
    init().then(()=>{
        console.log('initializing is done ...')
    });

    const modules = JSON.parse(
        fs.readFileSync('config/modules.json')
    );


    modules.forEach((module) => {
        const moduleRouter = require(`../app/${module}/router`);
        moduleRouter(router);
    });

    handler.run(app);
    rbd();
};
module.exports = {app, start};
