const { Restore } = require('../../../core/models/restore');

const getAll = async (params, size, page) => {
    const offset = (parseInt(page) - 1) * parseInt(size), limit = parseInt(size);
    const filter = {};
    if (params.state != undefined) {
        filter.state = params.state;
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
    const restores = await Restore.find(filter).skip(offset).limit(limit);

    for (let i = 0; i < restores.length; i += 1) {
        restores[i] = restores[i].toObject();
        delete restores[i].__v;
    }
    return restores;
};

const countAll = async (params) => {
    const filter = {};
    if (params.state != undefined) {
        filter.state = params.state;
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
    return await Restore.countDocuments(filter);
};

module.exports = { 
    getAll, 
    countAll, 
};

