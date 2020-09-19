// Modules ==================================

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const DB = require('./api/utils/db');
const jsBase64 = require('js-base64');
const morgan = require('morgan');
const multer = require('multer');
const upload = multer();
// TODO: Figure out how to handle the credentials for API and website
const env = require('./bin/enviroment');
const utils = require('./api/utils/utils');

const logStream = fs.createWriteStream(path.join(__dirname, './logs/bookworm_reviews.log'), {flags: 'a'});
/*const errorLog = fs.createWriteStream(path.join(__dirname, '../logs/node_error.log'), {flags: 'a'});

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

app.use(morgan('tiny', {
    stream: logStream
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(upload.any());


let db;

try {
    db = new DB(env.dbCredentials.username, env.dbCredentials.password);
} catch (err) {
    console.error(err);
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

        if (utils.checkAuth(username, password)) {
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
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

app.get('/api/blogpost', (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(" ")[1]);
        let username = auth.split(":")[0];
        let password = auth.split(":")[1];

        if (utils.checkAuth(username, password)) {

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
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
})

app.post('/api/blogs', async (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(" ")[1]);
        let username = auth.split(":")[0];
        let password = auth.split(":")[1];

        if (utils.checkAuth(username, password)) {
            db.addBlog(req.body).then(blog => {
                fs.writeFile(`${env.blogLocation}/${blog._id}.txt`, req.body.blogText, {flag: 'w'}, (writeErr) => {
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
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

app.delete('/api/blogs', async (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(" ")[1]);
        let username = auth.split(":")[0];
        let password = auth.split(":")[1];

        if (utils.checkAuth(username, password)) {
            db.deleteBlog(req.body.id).then(() => {
                res.sendStatus(200);
            }, reject => {
                console.error(reject);
                res.sendStatus(400);
            });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401)
    }
});

app.post('/api/comment', async (req, res) => {
    // Add a comment to the blog post
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(" ")[1]);
        let username = auth.split(":")[0];
        let password = auth.split(":")[1];

        if (utils.checkAuth(username, password)) {
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
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401)
    }
})

// Request Related API Methods

app.get('/api/requests', async (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(' ')[1]);
        let username = auth.split(':')[0];
        let password = auth.split(':')[1];

        if (utils.checkAuth(username, password)) {
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
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

app.post('/api/requests', async (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(' ')[1]);
        let username = auth.split(':')[0];
        let password = auth.split(':')[1];

        if (utils.checkAuth(username, password)) {
            db.addRequest(req.body.bookTitle, req.body.bookAuthor, req.body.name, req.body.email, req.body.extra).then(() => {
                res.sendStatus(201);
            }, failure => {
                console.error(failure);
                res.sendStatus(400);
            });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
})

app.delete('/api/requests', async (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(' ')[1]);
        let username = auth.split(':')[0];
        let password = auth.split(':')[1];

        if (utils.checkAuth(username, password)) {
            db.deleteRequest(req.body.id).then(() => {
                res.sendStatus(200);
            }, failure => {
                console.error(failure);
                res.sendStatus(404);
            });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
})

app.get('/api/login', (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(' ')[1]);
        let username = auth.split(':')[0];
        let password = auth.split(':')[1];

        if (utils.checkAuth(username, password)) {
            res.sendStatus(utils.checkLogin(req.body.username, req.body.password));
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
})

app.put('/api/cover', async (req, res) => {
    if (req.headers.authorization) {
        let auth = jsBase64.decode(req.headers.authorization.split(' ')[1]);
        let username = auth.split(':')[0];
        let password = auth.split(':')[1];

        if (utils.checkAuth(username, password)) {
            db.saveCover(req.query.id, req.files[0].buffer).then(() => {
                res.sendStatus(201);
            }, reject => {
                console.error(reject);
                res.sendStatus(400);
            });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
})

module.exports = app;