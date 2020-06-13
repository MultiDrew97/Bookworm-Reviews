const mongoose = require('mongoose');
const dateConverter = require('../utils/dateConverter');
let currentDate = new Date(Date.now());

/* This will be needed when adding a blog post to the database. This will allow the date to be
     retrieved from the current time. The Date constructor auto converts the Date.now() miliseconds to the current date.
     Then I can just pick out the parts of the date that I want to use

     const date1 = new Date(Date.now());
     console.log(dateConverter.monthConverter(date1.getMonth()));
*/

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
        default: `${dateConverter.dateToString(currentDate.getMonth(), currentDate.getDate(), currentDate.getFullYear())}`
    },
    blogAuthor: {
        type: String,
        default: 'Jasmine Taylor'
    }
}, 'BlogPosts')