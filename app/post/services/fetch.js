const models = require('../models/model');
const userModels = require('../../user/models/models');

const checkAccess = async(username) =>{
    user = (await userModels.User.find({username: username}).populate('role'))[0];
    return (
        user !== undefined && (
        user.role.name == 'author' || 
        user.role.name == 'admin' || 
        user.role.name == 'editor') && 
        !user.is_blocked
    );
};

const fetch = async (id, user)=>{
    const access = await checkAccess(user);
    const post = await models.Post.find({_id: id, is_deleted: false}).populate('author', 'username');
    // returns undefined if user is not authorized to access unpublished posts
    if (post[0] !== undefined && !post[0].published && !access){
        post[0] = undefined;
    }
    return post;
}

module.exports = fetch;
