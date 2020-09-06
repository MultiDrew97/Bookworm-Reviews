const mongoose = require('mongoose');

module.exports = mongoose.model('Comment', {
    _id: mongoose.Types.ObjectId,
    blogID: mongoose.Types.ObjectId,
    commenter: {
        type: String,
        default: 'Anonymous'
    },
    body: String,
    date: {
        type: Date,
        default: Date.now()
    },
    votes: {
        up: {
            type: Number,
            default: 0
        },
        down: {
            type: Number,
            default: 0
        }}
}, 'Comments');