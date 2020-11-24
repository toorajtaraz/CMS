const { Settings } = require('../../../core/models/settings');



module.exports = async () => {
    const settings = await Settings.findOne();
    return  settings;
};



