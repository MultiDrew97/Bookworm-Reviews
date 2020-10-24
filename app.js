// Modules ==================================

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const Database = require('./api/utils/db');
const Logs = require('./api/utils/logger');
const jsBase64 = require('js-base64');
const logger = require('morgan');
const multer = require('multer');
const upload = multer();
// TODO: Figure out how to handle the credentials for API and website
const env = require('./bin/env');
const utils = require('./api/utils/utils');

const logStream = fs.createWriteStream(path.join(__dirname, `logs/${env.logs.access}`), {flags: 'a'});
let temp;

try {
    temp = fs.opendirSync(path.join(__dirname, 'logs'));
    console.log('Directory already exists');
} catch (ex) {
    fs.mkdirSync(path.join(__dirname, 'logs'));
    try {
        temp = fs.opendirSync(path.join(__dirname, 'logs'));
    } catch (ex) {
        console.trace(ex);
    }
} finally {
    temp.closeSync();
}
/*const errorLog = fs.createWriteStream(path.join(__dirname, 'logs/node_error.log'), {flags: 'a'});

(function() {
    let origLog = console.log;
    console.log = function(message) {
        origLog(message)
        accessLog.write(message);
    }

    let origErr = console.error;
    console.error = function(error) {
        origErr(error);
        errorLog.write(error);
    }
})();*/

const app = express();

app.use(logger('tiny', {
    stream: logStream
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(upload.any());

let logs;

try {
    logs = new Logs();
    logs.log('Created logger');
} catch (err) {
    console.trace(err);
}


let db;

try {
    logs.log('Connecting to database');
    db = new Database(env.dbCredentials.username, env.dbCredentials.password);
    logs.log('Connected to database');
} catch (err) {
    logs.error('Error occurred when connecting to database', err)
    console.trace(err);
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
        let auth = (jsBase64.decode(req.headers.authorization.split(" ")[1])).split(':');

        if (utils.checkAuth(auth)) {
            if (req.query.id) {
                db.getBlog(req.query.id).then(blog => {
                    res.send(blog);
                });
            } else {
                db.getBlogs().then(blogs => {
                    res.send(blogs);
                });
            }
        } else {
            unAuth(auth, res);
        }
    } else {
        noAuth(res);
    }
});

app.get('/api/blogpost', (req, res) => {
    if (req.headers.authorization) {
        let auth = (jsBase64.decode(req.headers.authorization.split(" ")[1])).split(':');

        if (utils.checkAuth(auth)) {

            const path = `${env.blogLocation}/${req.query.id}.txt`;
            if (fs.access(path, (err)=> {
                if (err) {
                    console.error(err);
                    res.sendStatus(404);
                }

                fs.readFile(path,(err, data) => {
                    res.send(data);
                })
            })) {

            }
        } else {
            unAuth(auth, res);
        }
    } else {
        noAuth(res);
    }
})

app.post('/api/blogs', async (req, res) => {
    if (req.headers.authorization) {
        let auth = (jsBase64.decode(req.headers.authorization.split(" ")[1])).split(':');

        if (utils.checkAuth(auth)) {
            db.addBlog(req.body).then(blog => {
                fs.writeFile(`${env.locations.blogLocation}/${blog._id}.txt`, req.body.blogText, {flag: 'w'}, (writeErr) => {
                    if (writeErr) {
                        console.error(writeErr);
                        res.sendStatus(400);
                    }

                    res.status(201);
                    res.send({newID: blog._id});
                })
            }, reject => {
                console.error(reject);
                res.sendStatus(400);
            })
        } else {
            unAuth(auth, res);
        }
    } else {
        noAuth(res);
    }
});

app.delete('/api/blogs', async (req, res) => {
    if (req.headers.authorization) {
        let auth = (jsBase64.decode(req.headers.authorization.split(" ")[1])).split(':');

        if (utils.checkAuth(auth)) {
            db.deleteBlog(req.body.id).then(() => {
                res.sendStatus(200);
            }, reject => {
                console.error(reject);
                res.sendStatus(400);
            });
        } else {
            unAuth(auth, res);
        }
    } else {
        noAuth(res)
    }
});

app.get('/api/blogs/search', (req, res) => {
    if (req.headers.authorization) {
        let auth = (jsBase64.decode(req.headers.authorization.split(" ")[1])).split(':');

        if (utils.checkAuth(auth)) {
            /*let criteria = req.query.p0;
            let search = {
                bookTitle: `/${criteria}/i`,
                bookAuthor: `/${criteria}/i`
            }
            db.findBlogs(search).then((err, blogs) => {
                if (err)
                    res.sendStatus(400);

                res.send(blogs)
            })*/

            console.log(JSON.parse(jsBase64.decode(req.query.p0)));
            res.sendStatus(200);
        } else {
            unAuth(auth, res);
        }
    } else {
        noAuth(res)
    }
})

app.post('/api/comment', async (req, res) => {
    // Add a comment to the blog post
    if (req.headers.authorization) {
        let auth = (jsBase64.decode(req.headers.authorization.split(" ")[1])).split(':');

        if (utils.checkAuth(auth)) {
            db.addComment(req.body).then(comment => {
                console.log('Comment ID:', comment._id);

                db.getBlog(req.body.blogID).then(blog => {
                    console.log('Find Blog when commenting Resolve:', blog);
                    blog.comments.push(comment._id);
                    console.log(blog.comments);
                    res.sendStatus(201);
                }, reject => {
                    console.error(reject);
                    res.sendStatus(404);
                })
            }, reject => {
                console.error(reject);
                res.sendStatus(400);
            });
        } else {
            unAuth(auth, res);
        }
    } else {
        noAuth(res)
    }
})

// Request Related API Methods

app.get('/api/requests', async (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(' ')[1]);

        if (utils.checkAuth(auth)) {
            if (req.query.id) {
                db.getRequest(req.query.id).then(success => {
                    res.send(success);
                }, failure => {
                    console.error(failure);
                    res.sendStatus(404);
                });
            } else {
                db.getRequests().then(success => {
                    res.send(success);
                }, failure => {
                    console.error(failure);
                    res.sendStatus(404);
                })
            }
        } else {
            unAuth(auth, res);
        }
    } else {
        noAuth(res);
    }
});

app.post('/api/requests', async (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(' ')[1]);

        if (utils.checkAuth(auth)) {
            db.addRequest(req.body.bookTitle, req.body.bookAuthor, req.body.name, req.body.email, req.body.extra).then(() => {
                res.sendStatus(201);
            }, failure => {
                console.error(failure);
                res.sendStatus(400);
            });
        } else {
            unAuth(auth, res);
        }
    } else {
        noAuth(res);
    }
})

app.delete('/api/requests', async (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(' ')[1]);

        if (utils.checkAuth(auth)) {
            db.deleteRequest(req.body.id).then(() => {
                res.sendStatus(200);
            }, failure => {
                console.error(failure);
                res.sendStatus(404);
            });
        } else {
            unAuth(auth, res);
        }
    } else {
        noAuth(res);
    }
})

app.get('/api/login', (req, res) => {
    if (req.headers.authorization) {
        let auth = (jsBase64.decode(req.headers.authorization.split(' ')[1])).split(':');

        if (utils.checkAuth(auth)) {
            let user = utils.checkLogin((jsBase64.decode(req.query.p0)).split(':'));

            if (user) {
                res.status(200).send(user);
            } else {
                res.sendStatus(401);
            }
        } else {
            unAuth(auth, res);
        }
    } else {
        noAuth(res);
    }
})

app.put('/api/cover', async (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(' ')[1]);


        if (utils.checkAuth(auth)) {
            db.saveCover(req.query.id, req.files[0].buffer).then(() => {
                res.sendStatus(201);
            }, fail => {
                console.error(fail);
                logs.error('Failed to access database', fail)
                res.sendStatus(400);
            });
        } else {
            unAuth(auth, res);
        }
    } else {
        noAuth(res);
    }
})

function unAuth(auth, res) {
    logs.error('Unauthorized attempt to use API', auth)
    res.sendStatus(401);
}

function noAuth(res) {
    logs.error('Attempt to use API without authorization');
    res.sendStatus(401);
}

module.exports = app;