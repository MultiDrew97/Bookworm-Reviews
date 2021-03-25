const mongoose = require('mongoose');

module.exports = mongoose.model('Request', {
    bookTitle: String,
    bookAuthor: String,
    requester: {
        name: String,
        email: String
    },
    extra: {
        type: String,
        default: ''
    },
    requestDate: {
        type: Date,
        default: Date.now()
    }
}, 'Requests')