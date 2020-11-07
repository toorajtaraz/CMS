const models = require('../models/model');
const userModels = require('../../user/models/models');

const checkAccess = async(username) =>{
    user = (await userModels.User.find({username: username}).populate('role'))[0];
    return (
        user !== undefined &&  
        !user.is_blocked &&(
        user.role.name == 'author' || 
        user.role.name == 'admin'  
    ));
};

const remove = async (id, user)=>{
    const post = await models.Post.findOneAndUpdate(
        {_id: id, is_deleted: false},
        {is_deleted: true}
        );
    return post;
}

module.exports = {
    remove,
    checkAccess
};
