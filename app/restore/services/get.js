const { Restore } = require('../../../core/models/restore');

const getAll = async (params, size, page) => {
    const offset = (parseInt(page) - 1) * parseInt(size), limit = parseInt(size);
    const filter = {state: { $not: { $eq: -100} } };
    if (params.state != undefined) {
        filter.state = params.state;
    }
    if (params.s_date != undefined) {
        if (params.e_date != undefined) {
            filter.date = { $gt : new Date(params.s_date).toISOString() , $lt : new Date(params.e_date).toISOString() };
        } else {
            filter.date = { $gt : new Date(params.s_date).toISOString() };            
        }
    } else {
        if (params.e_date != undefined) {
            filter.date = {$lt : new Date(params.e_date).toISOString() };
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
    const filter = {state: { $not: { $eq: -100} } };
    if (params.state != undefined) {
        filter.state = params.state;
    }
    if (params.s_date != undefined) {
        if (params.e_date != undefined) {
            filter.date = { $gt : new Date(params.s_date).toISOString() , $lt : new Date(params.e_date).toISOString() };
        } else {
            filter.date = { $gt : new Date(params.s_date).toISOString() };            
        }
    } else {
        if (params.e_date != undefined) {
            filter.date = {$lt : new Date(params.e_date).toISOString() };
        }
    }
    return await Restore.countDocuments(filter);
};

module.exports = { 
    getAll, 
    countAll, 
};

