const models = require('../models/model');
const userModels = require('../../user/models/models');

const checkAccess = async (username) => {
    user = (await userModels.User.find({username: username}).populate('role'))[0];
    return (user.role.name == 'author' && !user.is_blocked);
}

const create = async (data)=>{
    let date = new Date().toISOString().split('T')[0];
    await Promise.all(data.tags.map(async (tag) => {
        exists = await models.Tag.findById(tag);
        // add tag if not exists
        if (exists === null){
            const newTag = new models.Tag({
                _id : tag, 
                dateCreated: date,
                dateModified: date,
            });
            await newTag.save();
        }
        return tag
    }));
    // get author id
    data.author = (await userModels.User.find({username: data.author}))[0]._id;
    const post = new models.Post({
        title: data.title,
        content: data.content,
        summary: data.summary || null,
        datePosted: data.datePosted,
        published: data.published || true,
        author: data.author,
        tags: data.tags        
        });
    return await post.save();
}

module.exports = {
    create,
    checkAccess,
}
