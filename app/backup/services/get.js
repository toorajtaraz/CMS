const { Backup } = require('../../../core/models/backup');
const config = require('config');

const fs = require('fs');
const getAll = async (params, size, page) => {
    const offset = (parseInt(page) - 1) * parseInt(size), limit = parseInt(size);
    const filter = {state: { $not: {$eq: -100} }};
    if (params.state != undefined) {
        filter.state = params.state;
    }
    if (params.is_full != undefined) {
        filter.is_full = params.is_full;
    }
    if (params.s_date != undefined && params.s_date != "undefined" ) {
        if (params.e_date != undefined && params.e_date != "undefined") {
            filter.date = { $gt : new Date(params.s_date).toISOString() , $lt : new Date(params.e_date).toISOString() };
        } else {
            filter.date = { $gt : new Date(params.s_date).toISOString() };            
        }
    } else {
        if (params.e_date != undefined && params.e_date != "undefined") {
            filter.date = {$lt : new Date(params.e_date).toISOString() };
        }
    }
    const backups = await Backup.find(filter).skip(offset).limit(limit);

    for (let i = 0; i < backups.length; i += 1) {
        backups[i] = backups[i].toObject();
        delete backups[i].__v;
        if (backups[i].downloadLinkTar != '') {
            backups[i].downloadLinkTar = config.get('URL') + backups[i].downloadLinkTar;
        }
        if (backups[i].downloadLinkZip != '') {
            backups[i].downloadLinkZip = config.get('URL') + backups[i].downloadLinkZip;
        }
    }
    return backups;
};

const getAvailable = () => {
    const collections = JSON.parse(
        fs.readFileSync('config/collections.json')
    );
    return collections;
};

const countAll = async (params) => {
    const filter = {state: { $not: {$eq: -100} }};
    if (params.state != undefined) {
        filter.state = params.state;
    }
    if (params.is_full != undefined) {
        filter.is_full = params.is_full;
    }
    if (params.s_date != undefined && params.s_date != "undefined" ) {
        if (params.e_date != undefined && params.e_date != "undefined") {
            filter.date = { $gt : new Date(params.s_date).toISOString() , $lt : new Date(params.e_date).toISOString() };
        } else {
            filter.date = { $gt : new Date(params.s_date).toISOString() };            
        }
    } else {
        if (params.e_date != undefined && params.e_date != "undefined") {
            filter.date = {$lt : new Date(params.e_date).toISOString() };
        }
    }

    return await Backup.countDocuments(filter);
};

module.exports = { 
    getAll, 
    getAvailable, 
    countAll, 
};
