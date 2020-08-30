// Modules ==================================

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
/*const fs = require('fs');*/
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

        if (checkAuth(username, password)) {
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

        if (checkAuth(username, password)) {
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

        if (checkAuth(username, password)) {
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

        if (checkAuth(username, password)) {
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

        if (checkAuth(username, password)) {
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

        if (checkAuth(username, password)) {
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

app.post('/api/login', (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(' ')[1]);
        let username = auth.split(':')[1];
        let password = auth.split(':')[0];

        if (checkAuth(username, password)) {
            res.send(checkLogin(req.body.username, req.body.password));
        } else {
            res.status(401);
            res.send();
        }
    } else {
        res.status(401);
        res.send();
    }
})

/*
    Helper functions
 */

const checkAuth = (username, password) => {
    for (let user = 0; user < env.apiAuth.length; user++) {
        if (username === env.apiAuth[user].username && password === env.apiAuth[user].password) {
            return true;
        }
    }

    return false;
}

const checkLogin = (username, password) => {
    for (let login = 0; login < env.logins.length; login++) {
        if (username === env.logins[login].username && password === env.logins[login].password) {
            return true
        }
    }

    return false;
}

module.exports = app;