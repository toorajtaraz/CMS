const models = require('../models/model');
const moment = require('moment');

const checkAccess = async (id) => {
    blocked = (await models.User.findById(id)).is_blocked;
    userRole = (await models.UserRole.findById(id).populate('role'));
    return (userRole.name == 'author' && !blocked);
}

const create = async (data)=>{
    let date = new Date().toISOString().split('T')[0]
    const tags = await Promise.all(data.tags.map(async (tag) => {
        exists = await models.Tag.findById(tag);
        if (exists === undefined){
            tag = new models.Tag({
                _id : tag, 
                dateCreated: date,
                dateModified: date,
            });
        }
        return {_id: tag}
    }));
    data.tags = tags;

    const post = new models.Post({
        title: data.title,
        content: data.content,
        summary: data.summary || null,
        published: data.published || true,
        datePosted: data.datePosted,
        author: data.author,
        tags: data.tags        
        });
    return await post.save();
}

module.exports = {
    create,
    checkAccess,
}
