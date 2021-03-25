// Modules ==================================

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const Database = require('./api/utils/db');
const jsBase64 = require('js-base64');
const logger = require('morgan');
const multer = require('multer');
const upload = multer();
// TODO: Figure out how to handle the credentials for API and website
const env = process.env.NODE_ENV === "development" ? require('./bin/env').debug : require('./bin/env').production;
const utils = require('./api/utils/utils');
const logStream = fs.createWriteStream(path.join(__dirname, `logs/${env.logs.access}`), {flags: 'a'});

const app = express();

app.use(logger('tiny', {
    stream: logStream
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(upload.any());

let db;

try {
    utils.logs.log('Connecting to database');
    db = new Database(env.database.username, env.database.password);
    utils.logs.log('Connected to database');
} catch (err) {
    utils.logs.error('Error occurred when connecting to database', err)
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
            utils.unAuth(auth, res);
        }
    } else {
        utils.noAuth(res);
    }
});

app.get('/api/blogpost', (req, res) => {
    if (req.headers.authorization) {
        let auth = (jsBase64.decode(req.headers.authorization.split(" ")[1])).split(':');

        if (utils.checkAuth(auth)) {

            const path = `${env.locations.blogLocation}/${req.query.id}.txt`;
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
            utils.unAuth(auth, res);
        }
    } else {
        utils.noAuth(res);
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
            utils.unAuth(auth, res);
        }
    } else {
        utils.noAuth(res);
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
            utils.unAuth(auth, res);
        }
    } else {
        utils.noAuth(res)
    }
});

app.get('/api/blogs/search', (req, res) => {
    if (req.headers.authorization) {
        let auth = (jsBase64.decode(req.headers.authorization.split(" ")[1])).split(':');

        if (utils.checkAuth(auth)) {
            let criteria = {
                bookTitle: new RegExp(req.query.p0, 'i'),
                bookAuthor: new RegExp((req.query.p1 ? req.query.p1 : req.query.p0), 'i')
            }

            /*
                Below line is same as:
                let advanced = req.query.p0 ? true : false
             */
            let advanced = !!req.query.p1;

            db.findBlogs(advanced, criteria).then(blogs => {
                utils.logs.log("A search was performed on the database", {advanced: advanced, criteria: criteria})
                res.status(200).send(blogs)
            }, fail => {
                utils.logs.error("A search failed on the database", fail)
                res.sendStatus(400)
            })
        } else {
            utils.unAuth(auth, res);
        }
    } else {
        utils.noAuth(res)
    }
})

/*
    Comment related API handles
 */

app.get('/api/comment', (req, res) => {
    if (req.headers.authorization) {
        let auth = (jsBase64.decode(req.headers.authorization.split(" ")[1])).split(':');

        if (utils.checkAuth(auth)) {

            (new Promise((resolve, reject) => {
                let results = [];
                db.getBlogComments(req.query.blogID).then(async comments => {
                    utils.logs.log(`Comments for the blog with ID ${req.query.blogID} were retrieved`)

                    for(let i = 0; i < comments.comments.length; i++) {
                        await db.getComment(comments.comments[i]).then(comment => {
                            results.push(comment)
                        }, err => {
                            utils.logs.error(`Failed to retrieve comment with ID ${comments.comments[i]}`, err)
                        });
                    }

                    resolve(results)
                }, err => {
                    utils.logs.error(`Couldn't retrieve comments for blog with ID: ${req.query.blogID}`, err)
                    reject(err);
                })
            })).then(comments => {
                res.send(comments);
            })

        } else {
            utils.unAuth(auth, res);
        }
    } else {
        utils.noAuth(res)
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
            utils.unAuth(auth, res);
        }
    } else {
        utils.noAuth(res)
    }
})

/*
    Request Related API Methods
 */

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
            utils.unAuth(auth, res);
        }
    } else {
        utils.noAuth(res);
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
            utils.unAuth(auth, res);
        }
    } else {
        utils.noAuth(res);
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
            utils.unAuth(auth, res);
        }
    } else {
        utils.noAuth(res);
    }
})

/*
    Login based API handles
 */

app.get('/api/login', (req, res) => {
    if (req.headers.authorization) {
        let auth = (jsBase64.decode(req.headers.authorization.split(' ')[1])).split(':');

        if (utils.checkAuth(auth)) {
            const loginParts = jsBase64.decode(req.query.p0).split(':')
            let login = {username: loginParts[0], password: loginParts[1]};
            let users = [];
            db.getUsers().then(data => {
                for (let i = 0; i < data.length; i++) {
                    users.push(data[i]._doc);
                }
                let user = utils.checkLogin(users, login);

                if (user) {
                    res.status(200).send(user);
                } else {
                    res.sendStatus(401);
                }
            })
        } else {
            utils.unAuth(auth, res);
        }
    } else {
        utils.noAuth(res);
    }
})

/*
    Cover related API handles
 */

app.put('/api/cover', async (req, res) => {
    if (req.headers.authorization) {
        let auth = (jsBase64.decode(req.headers.authorization.split(' ')[1])).split(':');

        if (utils.checkAuth(auth)) {
            db.saveCover(req.query.id, req.files[0].buffer).then(() => {
                res.sendStatus(201);
            }, fail => {
                console.error(fail);
                utils.logs.error('Failed to access database', fail)
                res.sendStatus(400);
            });
        } else {
            utils.unAuth(auth, res);
        }
    } else {
        utils.noAuth(res);
    }
})

/*function unAuth(auth, res) {
    logs.error('Unauthorized attempt to use API', auth)
    res.sendStatus(401);
}

function noAuth(res) {
    logs.error('Attempt to use API without authorization');
    res.sendStatus(401);
}*/

module.exports = app;