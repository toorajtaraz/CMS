const models = require('../models/model');
const userModels = require('../../user/models/models');

const checkAccess = async(username) =>{
    user = (await userModels.User.findOne({username: username}).populate('role'));
    return (
        user.role !== undefined && (
        user.role.name == 'author' || 
        user.role.name == 'admin' || 
        user.role.name == 'editor' && 
        !user.is_blocked
    ));
};

const search = async (data, user)=>{
    page = data.page || 1;
    size = data.size || 10;
    // used only if user has access to unpublished posts
    let {published = { $nin: [] }} = data;
    
    // check access to unpublished data
    const hasAccess = await checkAccess(user);

    const query = {
        // is_deleted: false,
        $text: { $search: data.searchTerms },
        // published: (hasAccess)? published : true,
        // author: data.author || { $nin: [] },
        // tags: (data.tags !== undefined)? { $in: data.tags } : { $nin: [] },
    };

    let pageCount = await models.Post.countDocuments(query);
    pageCount = Math.ceil(pageCount/size);

    const posts = await models.Post.find(query, 
        {
            score: { $meta: "textScore" },
        },
        {
            limit: size,
            skip: (page - 1) * size
    })
    .sort( { score: { $meta: "textScore" } } );
    console.log(query);
    return {
        posts: posts,
        pageCount: pageCount
    };
}

module.exports = search;
