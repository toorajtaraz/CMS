const { Settings } = require('../core/models/settings');
const { hashPass } = require('../core/auth/auth');
const config = require('config');
const defaultPassword = config.get('DEFAULTPASS');

module.exports = async () => {
    if ((await Settings.find()).length === 0) {
        await Settings.create({restorePasswordHash: await hashPass(defaultPassword)});
    }
}
