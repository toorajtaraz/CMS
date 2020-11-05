const {mongoose} = require('../../../core/db/mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true,},
    role: {type: mongoose.Schema.Types.ObjectId, ref: 'Role'},
    password: {type: String, required: true},
    is_deleted: {type: Boolean, default: false},
    is_blocked: {type: Boolean, default: false},
    attempts: {type: Number, default: 0},
});

const RoleSchema = new mongoose.Schema({
    name: {type: String, required: true,},
    is_deleted: {type: Boolean, default: false,},
});


const User = mongoose.model('User', UserSchema);
const Role = mongoose.model('Role', RoleSchema);


module.exports = {
    User,
    Role,
};



