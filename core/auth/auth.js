const bcrypt = require('bcrypt');
const passwordSheriff = require('password-sheriff');
const jwt = require('jsonwebtoken');
const config = require('config');
const { PasswordPolicy, charsets } = passwordSheriff;
const saltRounds = 10;
const { Token } = require('../../app/users/models/token');
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

async function canAccess(request) {
    const header = request.headers.authorization || request.headers.Authorization;
    if (header) {
        const splited = header.split(' ');
        const type = splited[0];
        const token = splited[1];
        if (type === 'Bearer') {
            try {
                const payload = jwt.verify(token, pk);
                const token_check = await Token.findById(payload.token_id);
                if (token_check === undefined || token_check === null) {
                    return {
                        payload : null,
                        verify : false,
                    };                
                }
                return {
                    payload,
                    verify : true,
                };
            } catch {
                return {
                    payload : null,
                    verify : false,
                };
            }
        } else {
            return {
                payload : null,
                verify : false,
            }
        }
    } else {
        return {
            payload: null,
            verify: false,
        };
    }

}

module.exports = {
    isPassValid,
    hashPass,
    canAccess,
    signKey,
    signData,
    extractData,
}
