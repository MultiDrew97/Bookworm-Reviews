const mongoose = require('mongoose');

module.exports = mongoose.model('BlogPost', {
    bookTitle: String,
    bookAuthor: String,
    description: String,
    blogPubDate: {
        type: Date,
        default: Date.now()
    },
    blogAuthor: String,
    votes: {
        up: {
            type: Number,
            default: 0
        },
        down: {
            type: Number,
            default: 0
        }
    },
    comments: [mongoose.Types.ObjectId]
}, 'BlogPosts')