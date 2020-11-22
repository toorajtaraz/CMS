const models = require('../models/model');
const userModels = require('../../user/models/models');

const checkAccess = async (username) => {
    user = (await userModels.User.findOne({username: username}).populate('role'));
    return (user.role != undefined && (
        user.role.name == 'author' || 
        user.role.name == 'admin' || 
        user.role.name == 'editor') && 
        !user.is_blocked);
}

const update = async (id, data, user)=>{
    date = new Date().toISOString().split('T')[0];
    if(data.tags != undefined)
    {   
        if(data.overwrite) {
            // ensure unique tags if it's overwriting
            data.tags = data.tags.filter((val, index, self) => {
                return self.indexOf(val) === index;
            });
        }
        await Promise.all(data.tags.map(async (tag) => {
            const exists = await models.Tag.findById(tag);
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
    }
    else{
        data.tags = [];
    }

    const tags = (data.overwrite)? {tags: data.tags} : {$addToSet: {tags: {$each: data.tags}}};
    
    // get editor id
    data.editedBy = (await userModels.User.findOne({username: user}))._id ;
    
    const post = await models.Post.findOneAndUpdate({
        _id: id,
        is_deleted: false,
    }, 
        {
        title: data.title,
        content: data.content,
        summary: data.summary,
        published: data.published,
        $push: {editedBy: data.editedBy},
        ...tags,
        dateUpdated: date,
    },
    {
        new: true,
        omitUndefined: true,
    });
    return post;
}

module.exports = {
    update,
    checkAccess,
}
