const models = require('../../models/model');

const all = async (data)=>{
    page = data.page || 1;
    size = data.size || 20;
    sortBy = data.sortBy || 'dateCreated';

    const query = {
        is_deleted: false
    };

    const postsCount = await models.Tag.countDocuments(query);
    const pageCount = Math.ceil(postsCount/size);

    const tags = await models.Tag.find(query, null, {
        sort: { [sortBy]: 1 },
        limit: size,
        skip: (page - 1) * size
    });
    return {
        tags: tags,
        postsCount: postsCount,
        pageCount: pageCount,
    };
}

module.exports = all;
