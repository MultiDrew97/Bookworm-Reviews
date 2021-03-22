const mongoose = require('mongoose');
/*const dateConverter = require('../utils/dateConverter');
let currentDate = new Date(Date.now());*/

/* This will be needed when adding a blog post to the database. This will allow the date to be
     retrieved from the current time. The Date constructor auto converts the Date.now() miliseconds to the current date.
     Then I can just pick out the parts of the date that I want to use

     const date1 = new Date(Date.now());
     console.log(dateConverter.monthConverter(date1.getMonth()));
*/

module.exports = mongoose.model('User', {
    Username: String,
    Password: String,
    FirstName: String,
    LastName: String,
    DisplayName: String,
    UserType: {
        type: String,
        default: 'reader'
    }
}, 'Users')