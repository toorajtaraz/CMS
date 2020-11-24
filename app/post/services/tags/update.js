const models = require('../../models/model');
const userModels = require('../../../user/models/models');
const tags = require('../../controllers/tags');
const { model } = require('mongoose');

const checkAccess = async (username) => {
    user = (await userModels.User.findOne({username: username}).populate('role'));
    return (user.role != undefined && (
        user.role.name == 'author' || 
        user.role.name == 'admin' || 
        user.role.name == 'editor') && 
        !user.is_blocked);
}

const update = async (id, data) => {
    const date = new Date().toISOString().split('T')[0];
    let tag = await models.Tag.findById(id);
    if (tag === null) return tag;
    await models.Tag.deleteOne({_id: id});
    // update tag
    tag = new models.Tag({
        _id: data.name,
        dateCreated: tag.dateCreated,
        dateModified: date,
    });
    await tag.save();
    await models.Post.updateMany({
        tags: {$in: [id]},
    },{
        $set: { "tags.$": data.name },
    });

    return tag;
}

module.exports = {
    update,
    checkAccess,
}
