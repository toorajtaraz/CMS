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
async function isNumeric(str) {
    if (typeof str != "string") return false  
    return !isNaN(str) ;
  }
  async function period_is_in_range_hours(hours) {
    if (!isNumeric(hours)) return false  ;
    else if (Number(hours)<24 && Number(hours)>=0) return true;
    else return false;
  }
  async function period_is_in_range_days(days) {
    if (!isNumeric(days)) return false  ;
    else if (Number(days)<31 && Number(days)>=0) return true;
    else return false;
  }

  async function period_time_is_not_null(hours,days) {
    if (!isNumeric(hours) && !isNumeric(days)) return false;
    else if (!( (Number(hours)==0 && Number(days)==0) || (Number(hours)==null && Number(days)==null) )) return true;
    else return false;
  }

  async function period_is_acceptabel (hours , days){
    return (await period_is_in_range_hours(hours) &&
            await period_is_in_range_days(days) &&
            await period_time_is_not_null(hours , days)
    );
};
module.exports = {
    isPassValid,
    hashPass,
    signKey,
    signData,
    extractData,
    period_is_in_range_hours,
    period_is_in_range_days,
    period_time_is_not_null,
    period_is_acceptabel
}
