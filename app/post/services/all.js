const models = require('../models/model');
const userModels = require('../../user/models/models');

const checkAccess = async(username) =>{
    user = (await userModels.User.findOne({username: username}).populate('role'));
    return (
        user.role !== undefined && (
        user.role.name == 'author' || 
        user.role.name == 'admin' || 
        user.role.name == 'editor') && 
        !user.is_blocked
    );
};

const all = async (data, user)=>{
    page = data.page || 1;
    size = data.size || 10;
    sortBy = data.sortBy || 'datePosted';
    // used only if user has access to unpublished posts
    let {published = { $nin: [] }} = data;
    
    // check access to unpublished data
    const hasAccess = await checkAccess(user);

    const query = {
        is_deleted: false,
        published: (hasAccess)? published : true ,
        author: data.author || { $nin: [] },
        tags: (data.tags !== undefined)? { $in: data.tags } : { $nin: [] }
    };

    // gets number of total posts and pages
    // by current filters
    const postsCount = await models.Post.countDocuments(query);
    const pageCount = Math.ceil(postsCount/size);

    const posts = await models.Post.find(query, null, {
        sort: { [sortBy]: 1 },
        limit: size,
        skip: (page - 1) * size
    }).populate('author', 'username').populate('editedBy', 'username');
    return {
        posts: posts,
        pageCount: pageCount,
        postsCount: postsCount
    };
}

module.exports = all;
