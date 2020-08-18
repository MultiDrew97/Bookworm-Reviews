const mongoose = require('mongoose');
/*const dateConverter = require('../utils/dateConverter');
let currentDate = new Date(Date.now());*/

/* This will be needed when adding a blog post to the database. This will allow the date to be
     retrieved from the current time. The Date constructor auto converts the Date.now() miliseconds to the current date.
     Then I can just pick out the parts of the date that I want to use

     const date1 = new Date(Date.now());
     console.log(dateConverter.monthConverter(date1.getMonth()));
*/

module.exports = mongoose.model('BlogPost', {
    id: {
        // TODO: Change to proper data type when found
      type: integer,
      default: 0
    },
    bookTitle: {
        type: String,
        default: ''
    },
    bookAuthor: {
        type: String,
        default: ''
    },
    bookPubDate: {
        type: String,
        default: 'Jan 1, 1970'
    },
    description: {
      type: String,
      default: ''
    },
    blogLocation: {
        type: String,
        default: `${__dirname}\\public\\blogs\\`
    },
    blogPubDate: {
        type: Date,
        default: Date.now()
    },
    blogAuthor: {
        type: String,
        default: 'Jasmine Taylor'
    }
}, 'BlogPosts')