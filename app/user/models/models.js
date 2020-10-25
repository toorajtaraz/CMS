const {mongoose} = require('../../../core/db/mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true,},
    password: {type: String, required: true,},
    is_deleted: {type: Boolean, default: false,},
});

const RoleSchema = new mongoose.Schema({
    name: {type: String, required: true,},
    is_deleted: {type: Boolean, default: false,},
});

const UserRoleSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true,},
    role: {type: mongoose.Schema.Types.ObjectId, ref: 'Role', require: true,},
    is_deleted: {type: Boolean, default: false,},
});

const User = mongoose.model('User', UserSchema);
const Role = mongoose.model('Role', RoleSchema);
const UserRole = mongoose.model('UserRole', UserRoleSchema);

module.exports = {
    UserRole,
    User,
    Role,
};



