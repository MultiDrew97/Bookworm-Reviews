// Modules ==================================

const express = require('express');
const bodyParser = require('body-parser')
const File = require('file');
const FileReader = require('filereader');
const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set the port
// const port = 3000;

// frontend routes ==========================================

// routes are defined within the appRoutes.js file. I don't need the routes that are located within this file

// sample api route
// grab the student model I created
let BlogPost = require('./public/javascripts/models/blogPost');
app.get('/api/blogposts', (req, res) => {
    // use mongoose to get all students in the database
    BlogPost.find((err, blogPosts) => {
        // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(blogPosts); // return all students in JSON format
    });
});

app.post('/api/blogposts/send', function(req, res) {
    let blogPost = new BlogPost(); //create a new instance of the blog post model

    // set the blog information (comes from the request)
    blogPost.bookTitle = req.body.bookTitle;
    blogPost.bookAuthor = req.body.bookAuthor;
    blogPost.bookPublicationDate = req.body.bookPublicationDate;
    blogPost.blogAuthor = req.body.blogAuthor;
    blogPost.blogLocation = req.body.blogLocation;

    // save the entry into the collection
    blogPost.save((err) => {
        if (err)
            res.send(err);
        res.json({message: 'blog post created!'});
    });
});

app.delete('/api/blogposts/:bookTitle:bookAuthor', function(req, res) {
    BlogPost.remove({
        bookTitle: req.params.bookTitle,
        bookAuthor: req.params.bookAuthor
    }, (err) => {
        if(err)
            res.send(err);
        res.json({statusCode: 200});
    });
});

app.get('/blogs/*', (req, res) => {
    const fileName = req.url.substring(req.url.lastIndexOf('/') + 1, req.url.length)
    console.log(`${__dirname}\\public\\blogs\\${fileName}`);
    if (fileExists(fileName)) {
        let file = new File(`${__dirname}\\public\\blogs\\${fileName}`);
        let reader = new FileReader();
        reader.onload = (e) => {
            let contents = e.target.result;
            res.send(contents);
        }
        reader.readAsText(file);
    } else {
        res.send("Sorry, that blog post doesn't exist. Please contact the system administrator.")
    }
});

// Request Related methods

let Request = require('./public/javascripts/models/request')

app.get('/api/requests', (req, res) => {
    Request.find((err, requests) => {
        // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(requests); // return all students in JSON format
    });
});

app.post('/api/requests/send', (req, res) => {
    let request = new Request();
    request.bookTitle = req.body.BookTitle;
    request.bookAuthor = req.body.Author;
    request.requester.Name = req.body.Name || 'Anon';
    request.requester.Email = req.body.Email;
    request.extra = req.body.Extra;

    res.json({request: request});

    request.save((err) => {
        if (err)
            res.send(err);
        //res.json({message: 'Request submitted successfully!'});
    });
});

const fileExists = (fileName) => {
    //`$__dirname}\\public\\blogs\\${fileName}`
    console.WriteLine(fileName)
    return true;
}

module.exports = app;