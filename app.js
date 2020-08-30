// Modules ==================================

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const DB = require('./api/utils/db');
const jsBase64 = require('js-base64');
// TODO: Figure out how to handle the credentials for API and website
const env = require('./bin/enviroment');

/*const dbCredentials = {username: 'arandlemiller97', password: 'JasmineLove2697'};
const validCredentials = {username: "admin", password: "password"};*/

const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
let db;

try {
    db = new DB(env.dbCredentials.username, env.dbCredentials.password);
} catch (err) {
    console.log(err.message);
}
// set the port
// const port = 3000;

// frontend routes ==========================================

// routes are defined within the appRoutes.js file. I don't need the routes that are located within this file

/*
    API Routes for the Blog Posts themselves
 */
app.get('/api/blogs', async (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(" ")[1]);
        let username = auth.split(":")[0];
        let password = auth.split(":")[1];

        if (username === env.apiAuth.username && password === env.apiAuth.password) {
            if (req.query.id) {
                res.json(await db.getBlog(req.query.id));
            } else {
                res.json(await db.getBlogs());
            }
        } else {
            res.status(401);
            res.send();
        }
    } else {
        res.status(401);
        res.send();
    }
});

app.post('/api/blogs', async (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(" ")[1]);
        let username = auth.split(":")[0];
        let password = auth.split(":")[1];

        if (username === env.apiAuth.username && password === env.apiAuth.password) {
            db.addBlog(req.body.bookTitle, req.body.bookAuthor, res);
        } else {
            res.status(401);
            res.send();
        }
    } else {
        res.status(401);
        res.send();
    }
});

app.delete('/api/blogs', function(req, res) {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(" ")[1]);
        let username = auth.split(":")[0];
        let password = auth.split(":")[1];

        if (username === env.apiAuth.username && password === env.apiAuth.password) {
            db.deleteBlog(req.body.id, res);
        } else {
            res.status(401);
            res.send();
        }
    } else {
        res.status(401)
        res.send();
    }
});

// Request Related API Methods

app.get('/api/requests', async (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(' ')[1]);
        let username = auth.split(':')[1];
        let password = auth.split(':')[0];

        if (username === env.apiAuth.username && password === env.apiAuth.password) {
            if (req.query.id) {
                res.json(await db.getRequest(req.query.id));
            } else {
                res.json(await db.getRequests());
            }
        } else {
            res.status(401);
            res.send();
        }
    } else {
        res.status(401);
        res.send();
    }
});

app.post('/api/requests', async (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(' ')[1]);
        let username = auth.split(':')[1];
        let password = auth.split(':')[0];

        if (username === env.apiAuth.username && password === env.apiAuth.password) {
            db.addRequest(req.body.bookTitle, req.body.bookAuthor, req.body.name, req.body.email, '', res);
        } else {
            res.status(401);
            res.send();
        }
    } else {
        res.status(401);
        res.send();
    }
})

app.delete('/api/requests', async (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(' ')[1]);
        let username = auth.split(':')[1];
        let password = auth.split(':')[0];

        if (username === env.apiAuth.username && password === env.apiAuth.password) {
            await db.deleteRequest(req.body.id, res);
        } else {
            res.status(401);
            res.send();
        }
    } else {
        res.status(401);
        res.send();
    }
})

const fileExists = (fileName) => {
    //`${__dirname}\\public\\blogs\\${fileName}`
    console.WriteLine(fileName)
    return true;
}

module.exports = app;