const { Banned } = require('../models/banned');
const { User } = require('../../app/user/models/models');

module.exports = () => {
    setInterval(async () => {
        const banned = await Banned.find({date: { $lt : Date.now() - 60000 }});
        for (let i = 0; i < banned.length; i += 1) {
            await User.findByIdAndUpdate(banned[i].user, {attempts: 0});
            await Banned.findByIdAndRemove(banned[i]._id);
        }
    }, 60000);
}
