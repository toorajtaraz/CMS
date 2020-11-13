const {mongoose} =  require('../../../core/db/mongoose');

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    summary: {type: String, required: false},
    published: {type: Boolean, default: false},
    datePosted: {type: String, required: true},
    dateUpdated: {type: String, required: false},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    editedBy: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    tags: [{type: String, ref: 'Tag'}],
    is_deleted: {type: Boolean, default: false},
});

const TagSchema = new mongoose.Schema({
    // title: {type: String, required: true},
    _id: {type: String, unique: true},
    dateCreated: {type: String, required: true},
    dateModified: {type: String},
    is_deleted: {type: Boolean, default: false},
});


const Post = mongoose.model('Post', PostSchema, 'Post');
const Tag = mongoose.model('Tag', TagSchema, 'Tag');

module.exports = {
    Post,
    Tag,
};
