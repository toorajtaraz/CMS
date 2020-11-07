const models = require('../models/model');
const userModels = require('../../user/models/models');

const checkAccess = async(username) =>{
    user = (await userModels.User.findOne({username: username}).populate('role'));
    return (
        user !== undefined && (
        user.role.name == 'author' || 
        user.role.name == 'admin' || 
        user.role.name == 'editor' && 
        !user.is_blocked
    ));
};

const all = async (data, user)=>{
    page = data.page || 1;
    size = data.size || 10;
    sortBy = data.sortBy || 'datePosted';

    const hasAccess = await checkAccess(user);

    if(hasAccess){
        posts = await models.Post.find({
            is_deleted: false,
            author: data.author || { $nin: []} ,
            tags: (data.tags !== undefined)? { $in: data.tags} : { $nin: []}            
        }, null, {
            sort: { ['sortBy']: 1 },
            limit: size,
            skip: (page - 1) * size
        }).populate('author', 'username');
    }
    // hide unpublished posts from unauthorized users
    else{
        posts = await models.Post.find({
            is_deleted: false,
            published: true,
            author: data.author || { $nin: []},
            tags: (data.tags !== undefined)? { $in: data.tags} : { $nin: []}
        }, null, {
            sort: { ['sortBy']: 1 },
            limit: size,
            skip: (page - 1) * size
        }).populate('author', 'username');
    }
    return posts;
}

module.exports = all;
