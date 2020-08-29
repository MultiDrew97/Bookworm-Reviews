const mongoose = require('mongoose');
const BlogPost = require('../../public/javascripts/models/blogPost');
const Request = require('../../public/javascripts/models/request');
let connection;

function DB(username, password, desiredPage = "Bookworm-Reviews", options = { useNewUrlParser: true, useUnifiedTopology: true }) {
    // connect to the mongoDB using the supplied credentials and defaulting to the Bookworm-Reviews table
    // if no other table is specified and using the default options if no other ones are specified
    mongoose.connect(`mongodb+srv://${username}:${password}@bookworm-reviews-uze7z.gcp.mongodb.net/${desiredPage}?retryWrites=true&w=majority`, options, function(err) {
        if (err)
            throw new Error();

        /*console.log(mongoose.connections);*/
    });
    /*console.log(connection);*/
}

DB.prototype.getBlogs = () => {
    return BlogPost.find({});
    // return the array of JSON 'pages' from the database query
    /*BlogPost.findOne({'bookTitle': 'Vixen'}, 'bookTitle bookAuthor', (err, blogPosts) => {
        if (err)
            return null;

        return blogPosts;
    })*/
}

DB.prototype.getBlog = (id) => {
    return BlogPost.findById(id);
}

DB.prototype.findBlogs = (criteria) => {
    return BlogPost.find(criteria);
}

DB.prototype.addBlog = (bookTitle, bookAuthor, blogAuthor = "Jasmine Taylor") => {
    /*
        Add a new blog post to the database

        @param bookTitle The title of the book for the new blog post
        @param bookAuthor The author of the book that the new blog post is for
        @param [blogAuthor] The author of the new blog post (defaults to Jasmine Taylor if nothing is passed)

        @return The status code based on the addition of the blog post
     */

    let newBlog = new BlogPost();

    newBlog.bookTitle = bookTitle;
    newBlog.bookAuthor = bookAuthor;
    newBlog.blogAuthor = blogAuthor;
    newBlog.blogLocation = "./public/blogs/" + newBlog._id + ".txt";
    newBlog.blogPubDate = Date.now();
    newBlog.votes.up = 0;
    newBlog.votes.down = 0;
    newBlog.comments = [];

    newBlog.save((err) =>{
        if (err)
            return 420;

        return 201;
    })
}

DB.prototype.deleteBlog = (id, res) => {
    BlogPost.findByIdAndRemove(id, function(err, doc) {
        if (err || doc === null) {
            res.statusCode = 400;
            res.send('Failed to delete the request');
            return
        }

        res.statusCode = 200;
        res.send('Request successfully removed');
    });
}

DB.prototype.getRequests = () => {
    return Request.find({});
}

DB.prototype.getRequest = (id) => {
    return Request.findById(id);
}

DB.prototype.addRequest = (bookTitle, bookAuthor, reqName, reqEmail, extra) => {
    let newRequest = new Request()

    newRequest.bookTitle = bookTitle;
    newRequest.bookAuthor = bookAuthor;
    newRequest.requester = { name: reqName, email: reqEmail};
    newRequest.extra = extra;
    newRequest.requestDate = Date.now();

    newRequest.save();
}

DB.prototype.deleteRequest = (id, res) => {
    Request.findByIdAndRemove(id, function(err, doc) {
        if (err || doc === null) {
            res.statusCode = 400;
            res.send('Failed to delete the request');
            return
        }

        res.statusCode = 200;
        res.send('Request successfully removed');
    });
}


module.exports = DB;