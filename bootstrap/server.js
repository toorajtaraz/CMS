BASEDIR = `${__dirname}/..`;
process.env.NODE_CONFIG_DIR = `${BASEDIR}/config`;

const fs = require('fs');
const express = require('express');
const userModel = require('../app/user/models/models');
const adModel = require('../app/ads/models/model');

const init = require('./init');
const app = express();
const handler = require('../core/app');
const router = express.Router();
const { run } = require('../core/db/mongoose');
const rbd = require('../core/tools/BRD');
const ubd = require('../core/tools/UBD');
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

    await (new userModel.Role({name: "admin", is_deleted: false})).save();
    await (new userModel.Role({name: "author", is_deleted: false})).save();
    await (new userModel.Role({name: "editor", is_deleted: false})).save();
    // await (new adModel.Type({name:'type1', cost: 1000})).save();

    handler.run(app);
    rbd.run();
    ubd();
};
module.exports = {app, start};
