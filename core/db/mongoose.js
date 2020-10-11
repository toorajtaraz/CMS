const mongoose = require('mongoose');
const config = require('config');
const debug = config.get('DEBUG');

const run = async () => {
    mongoose.Promise = global.Promise;
    const connection = await mongoose.connect(config.get('MONGOURI'), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return connection;
}

exports.run = run;
exports.mongoose = mongoose;
