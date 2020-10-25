//TODO put all models in a single place
const models = require('../../app/user/models/models');
const identifyUser = async (req, res, next) => {
    const username = req.header('USER');
    console.log(username)
    if (!username) {
        return res.status(401).send({
            status: "error",
            message: {
                en: 'WHO ARE YOU?',
                fa: "هو آر یو؟",
            },
        });
    }
    const user = models.User.findOne({username: username, is_deleted: false});
    if (!user) {
        return res.status(401).send({
            status: "error",
            message: {
                en: 'YOU DO NOT EXIST!',
                fa: "",
            },
        })
    }
    req.user = user;
    next();
};

module.exports = identifyUser;
