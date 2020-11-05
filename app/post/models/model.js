const {mongoose} =  require('../../../core/db/mongoose');

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    summary: {type: String},
    published: {type: Boolean, required: true, default: true},
    datePosted: {type: String, required: true},
    dateUpdated: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    editedBy: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    is_deleted: {type: Boolean, default: false},
})

const TagSchema = new mongoose.Schema({
    // title: {type: String, required: true},
    _id: String,
    dateCreated: {type: String, required: true},
    dateModified: {type: String},
    is_deleted: {type: Boolean, default: false},
})


const Post = mongoose.model('Post', postSchema)
const Tag = mongoose.model('Tag', postSchema)

module.exports = {
    Post,
    Tag,
}
