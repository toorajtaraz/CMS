//TODO put all models in a single place
const models = require('../../app/user/models/models');
const identifyUser = async (req, res, next) => {
    const username = req.header('USER');
    console.log(username)
    if (!username) {
        return res.status(401).send({
            status: "error",
            message: {
                en: 'user not specified',
                fa: "کابر نامشخص",
            },
        });
    }
    let user = await models.User.findOne({username: username, is_deleted: false}).populate('role');
    if (!user || !user.role) {
        return res.status(401).send({
            status: "error",
            message: {
                en: 'user nonexistent',
                fa: "کاربر ناموجود",
            },
        });
    }
    user = user.toObject();
    user.role = user.role.name;
    req.user = user;
    return next();
};

module.exports = identifyUser;
