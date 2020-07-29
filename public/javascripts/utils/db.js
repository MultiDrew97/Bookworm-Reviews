const mongoose = require('mongoose');
const BlogPost = require('../models/blogPost');
const Request = require('../models/request');

function DB(username, password, desiredPage = "Bookworm-Reviews", options = { useNewUrlParser: true, useUnifiedTopology: true }) {
    // connect to the mongoDB using the supplied credentials and defaulting to the Bookworm-Reviews table
    // if no other table is specified and using the default options if no other ones are specified
    mongoose.connect(`mongodb+srv://${username}:${password}@bookworm-reviews-uze7z.gcp.mongodb.net/${desiredPage}?retryWrites=true&w=majority`, options)
}

DB.prototype.getReviews = () => {
    // return the array of JSON 'pages' from the database query

    BlogPost.find((err, blogPosts) => {
        if (err)
            return null;

        console.debug(blogPosts);
    })
}

DB.prototype.getReviews = (criteria = [''], areas = ["bookTitle"]) => {

}

DB.prototype.addReview = (bookTitle, bookAuthor, pubDate) => {
    DB.prototype.addReview({
        bookTitle: bookTitle,
        bookAuthor: bookAuthor,
        pubDate: pubDate
    });
}

DB.prototype.addReview = (bookInfo) => {
    let blog = new BlogPost();

    blog.bookTitle = bookInfo.bookTitle;
    blog.bookAuthor = bookInfo.bookAuthor;
    blog.bookPublicationDate = bookInfo.pubDate;

    blog.save((err) => {
        if (err)
            return null

        return true
    })
}

DB.prototype.addRequest = (bookTitle, bookAuthor) => {
    DB.prototype.addRequest({
        bookTitle: bookTitle,
        bookAuthor: bookAuthor,
        requestDate: Date.now()
    })
}

DB.prototype.addRequest = (requestInfo) => {
    let request = new Request();

    request.bookTitle = requestInfo.bookTitle;
    request.bookAuthor = requestInfo.bookAuthor;
    request.requestDate = requestInfo.requestDate;

    request.save((err) => {
        if (err)
            return null

        return true
    })
}


module.exports = DB;