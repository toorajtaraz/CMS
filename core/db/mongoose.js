const mongoose = require('mongoose');
const config = require('config');

const run = async () => { 
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
    const connection =  await mongoose.connect(config.get('MONGOURI'), { useNewUrlParser: true, useUnifiedTopology: true });
    return connection;
}

exports.run = run;
exports.mongoose = mongoose;
