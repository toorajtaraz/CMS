const { User } = require('../models/models');

const increaseAttempts = async (id, attempts) => {
    return await User.findByIdAndUpdate(id, {attempts: attempts + 1});
};
module.exports = {
    increaseAttempts
}
