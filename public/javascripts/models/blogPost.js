const mongoose = require('mongoose');
const comment = require('./comment.js');
/*const dateConverter = require('../utils/dateConverter');
let currentDate = new Date(Date.now());*/

/* This will be needed when adding a blog post to the database. This will allow the date to be
     retrieved from the current time. The Date constructor auto converts the Date.now() miliseconds to the current date.
     Then I can just pick out the parts of the date that I want to use

     const date1 = new Date(Date.now());
     console.log(dateConverter.monthConverter(date1.getMonth()));
*/

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