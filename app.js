// Modules ==================================

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const File = require('file');
const FileReader = require('filereader');
const mongoose = require('mongoose');
const DB = require('./api/utils/db');
const jsBase64 = require('js-base64');
const BlogPost = require('./public/javascripts/models/blogPost');

const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const db = new DB('arandlemiller97', 'JasmineLove2697');

// set the port
// const port = 3000;

// frontend routes ==========================================

// routes are defined within the appRoutes.js file. I don't need the routes that are located within this file

/*
    API Routes for the Blog Posts themselves
 */
app.get('/api/blogs', async (req, res) => {
    if (req.headers.authorization) {

        // TODO: Add authorization on all of the API paths
        res.send(jsBase64.decode(req.headers.authorization.split(" ")[1]));

        /*if (req.query.id) {
            res.json(await db.getBlog(req.query.id));
        } else {
            res.json(await db.getBlogs());
        }*/
    } else {
        res.statusCode = 401;
        res.send("unauthorized");
    }
});

app.post('/api/blogs/send', function(req, res) {
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

app.delete('/api/blogs', function(req, res) {
    db.deleteBlog(req.body.id, res);
});

/*app.get('/blogs/?blogID=:id', (req, res) => {
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
});*/

// Request Related API Methods

app.get('/api/requests', async (req, res) => {
    if (req.query.id){
        res.json(await db.getRequest(req.query.id));
    } else {
        res.json(await db.getRequests());
    }
});

app.post('/api/requests', async (req, res) => {
    db.addRequest(req.body.bookTitle, req.body.bookAuthor, req.body.name, req.body.email, '');
    res.statusCode = 201;
    res.send("Request created");
})

app.delete('/api/requests', async (req, res) => {
    await db.deleteRequest(req.body.id, res);

    /*res.status(200)
    res.send("Request deleted");*/
})

const fileExists = (fileName) => {
    //`${__dirname}\\public\\blogs\\${fileName}`
    console.WriteLine(fileName)
    return true;
}

module.exports = app;