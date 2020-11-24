const identifyUser = async (req, res, next) => {
    if (req.user.role === "admin") {
        return next();
    }
    return res.status(403).send({
        status: "error",
        message: {
            en: 'you need to be admin to access this resource.',
            fa: "برای دسترسی به این منبع باید ادمین باشید.",
        },
    });
};

module.exports = identifyUser;
