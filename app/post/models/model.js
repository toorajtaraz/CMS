const { Collection } = require('mongoose');
const {mongoose} =  require('../../../core/db/mongoose');

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true, index: true},
    content: {type: String, required: true, index: true},
    summary: {type: String, required: false, index: true},
    published: {type: Boolean, default: false, index: true},
    datePosted: {type: String, required: true, index: true},
    dateUpdated: {type: String, required: false, index: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User", index: true},
    editedBy: [{type: mongoose.Schema.Types.ObjectId, ref: "User", index: true}],
    tags: [{type: String, ref: 'Tag'}],
    is_deleted: {type: Boolean, default: false, index: true},
});

const TagSchema = new mongoose.Schema({
    // title: {type: String, required: true},
    _id: {type: String},
    dateCreated: {type: String, required: true},
    dateModified: {type: String},
    is_deleted: {type: Boolean, default: false},
});


const Post = mongoose.model('Post', PostSchema, 'Post');
const Tag = mongoose.model('Tag', TagSchema, 'Tag');


Post.createIndex({
    title: "text",
    content: "text",
    summary: "text",
},
{"weights": { title: 3, summary: 2, content:1 }, name: "TextIndex"});

module.exports = {
    Post,
    Tag,
};
