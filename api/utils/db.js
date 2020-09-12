const mongoose = require('mongoose');
const fs = require('fs').promises;
const BlogPost = require('../../public/javascripts/models/blogPost');
const Request = require('../../public/javascripts/models/request');
const Comment = require('../../public/javascripts/models/comment');
const env = require('../../bin/enviroment');

function DB(username, password, desiredPage = "Bookworm-Reviews", options = { useNewUrlParser: true, useUnifiedTopology: true }) {
    // connect to the mongoDB using the supplied credentials and defaulting to the Bookworm-Reviews table
    // if no other table is specified and using the default options if no other ones are specified
    mongoose.connect(`mongodb+srv://${username}:${password}@bookworm-reviews-uze7z.gcp.mongodb.net/${desiredPage}?retryWrites=true&w=majority`, options, function(err) {
        if (err)
            throw new Error('Failed to establish connection to the database');

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

DB.prototype.addBlog = (blog) => {
    /*
        Add a new blog post to the database

        @param bookTitle The title of the book for the new blog post
        @param bookAuthor The author of the book that the new blog post is for
        @param [blogAuthor] The author of the new blog post (defaults to Jasmine Taylor if nothing is passed)

        @return The status code based on the addition of the blog post
     */

    let newBlog = new BlogPost();

    newBlog.bookTitle = blog.bookTitle;
    newBlog.bookAuthor = blog.bookAuthor;
    newBlog.blogAuthor = blog.blogAuthor;
    newBlog.comments = [];

    return newBlog.save(/*(saveErr) => {
        if (saveErr) {
            console.debug(saveErr);
            return 400;
        }
        fs.writeFile(`${blogLocation}/${newBlog._id}.txt`, blog.blogText, {flag: 'w'}, (writeErr) => {
            if (writeErr) {
                console.debug(writeErr);
                return 400;
            }

            return 201;
        })
    }*/);
}

DB.prototype.deleteBlog = (id) => {
    return BlogPost.findByIdAndRemove(id);
}

DB.prototype.getComment = (id) => {
    return Comment.findById(id);
}

DB.prototype.addComment = (comment) => {
    let newComment = new Comment();

    newComment.blogID = comment.blogID;
    newComment.commenter = comment.commenter;
    newComment.body = comment.body;

    return newComment.save(/*err => {
        if (err) {
            console.debug('error occurred saving:', err)
            return 400
        }

        BlogPost.findById(newComment.blogID, (err, blog) => {
            if (err)
                return 404;

            blog.comments.push(newComment._id);

            blog.save(err => {
                if (err)
                    return 400;

                return 201
            })
        })
        return 201
    }*/);
}

DB.prototype.getRequests = () => {
    return Request.find({});
}

DB.prototype.getRequest = (id) => {
    return Request.findById(id);
}

DB.prototype.addRequest = (bookTitle, bookAuthor, reqName, reqEmail, extra = '') => {
    let newRequest = new Request()

    newRequest.bookTitle = bookTitle;
    newRequest.bookAuthor = bookAuthor;
    newRequest.requester = { name: reqName, email: reqEmail};
    newRequest.extra = extra;
    newRequest.requestDate = Date.now();

    return newRequest.save(/*(err) => {
        if (err) {
            /!*res.status(400);
            res.send();*!/
            return 400;
        }

        return 201
        /!*res.status(201);
        res.send();*!/
    }*/);
}

DB.prototype.deleteRequest = (id) => {
    return Request.findByIdAndRemove(id);
}

DB.prototype.saveCover =  (id, coverFileBuffer) => {
    return fs.writeFile(`${env.coverLocation}/${id}.png`, coverFileBuffer, 'binary');
}


module.exports = DB;