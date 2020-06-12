const mongoose = require('mongoose');
const dateConverter = require('../utils/dateConverter');
let current = new Date(Date.now());

module.exports = mongoose.model('BlogPost', {
    bookTitle: {
        type: String,
        default: ''
    },
    bookAuthor: {
        type: String,
        default: ''
    },
    bookPublicationDate: {
        type: String,
        default: 'Jan 1, 1970'
    },
    blogLocation: {
        type: String,
        default: `${process.cwd()}\\public\\blogs\\`
    },
    blogPublicationDate: {
        type: String,
        // converts the current date to a string
        default: `${dateConverter.dateToString(current.getMonth(), current.getDate(), current.getFullYear())}`
    },
    blogAuthor: {
        type: String,
        default: 'Jasmine Taylor'
    }
}, 'BlogPosts')