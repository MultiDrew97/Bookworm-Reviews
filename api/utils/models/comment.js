const mongoose = require('mongoose');

module.exports = mongoose.model('Comment', {
    blogID: mongoose.ObjectId,
    commenter: String,
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