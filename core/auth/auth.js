const bcrypt = require('bcrypt');
const passwordSheriff = require('password-sheriff');
const jwt = require('jsonwebtoken');
const config = require('config');
const { PasswordPolicy, charsets } = passwordSheriff;
const saltRounds = 10;
const pk = config.get('PK');

module.exports.PasswordPolicy = new PasswordPolicy({
    length: {
        minLength: 6,
    },
    containsAtLeast: {
        atLeast: 2,
        expressions: [ charsets.lowerCase, charsets.upperCase, charsets.numbers ]
    },
});

async function extractData(token) {
    return await jwt.verify(token, pk);
}

async function signData(data) {
    return await jwt.sign(data, pk);
}

async function signKey(id) {
    const expire = Date.now() + 86400000;
    return await jwt.sign({
        id,
        expire,
    }, pk);
}

async function isPassValid(pass, hash) {
    const result = await bcrypt.compare(pass, hash);
    return result;
}

async function hashPass(pass) {
    const hash = await bcrypt.hash(pass, saltRounds);
    return hash;
}

module.exports = {
    isPassValid,
    hashPass,
    signKey,
    signData,
    extractData,
}
