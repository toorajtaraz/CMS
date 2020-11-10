const { Backup } = require('../../../core/models/backup');
const fs = require('fs');
const getAll = async (params, size, page) => {
    const offset = (parseInt(page) - 1) * parseInt(size), limit = parseInt(size);
    const filter = {};
    if (params.state != undefined) {
        filter.state = params.state;
    }
    if (params.is_full != undefined) {
        filter.is_full = params.is_full;
    }
    if (params.s_date != undefined) {
        if (params.e_date != undefined) {
            filter.date = { $gt : params.s_date , $lt : params.e_date };
        } else {
            filter.date = { $gt : params.s_date };            
        }
    } else {
        if (params.e_date != undefined) {
            filter.date = {$lt : params.e_date};
        }
    }
    const backups = await Backup.find(filter).skip(offset).limit(limit);

    for (let i = 0; i < backups.length; i += 1) {
        backups[i] = backups[i].toObject();
        delete backups[i].__v;
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
    const filter = {};
    if (params.state != undefined) {
        filter.state = params.state;
    }
    if (params.is_full != undefined) {
        filter.is_full = params.is_full;
    }
    if (params.s_date != undefined) {
        if (params.e_date != undefined) {
            filter.date = { $gt : params.s_date , $lt : params.e_date };
        } else {
            filter.date = { $gt : params.s_date };            
        }
    } else {
        if (params.e_date != undefined) {
            filter.date = {$lt : params.e_date};
        }
    }
    return await Backup.countDocuments(filter);
};

module.exports = { 
    getAll, 
    getAvailable, 
    countAll, 
};
