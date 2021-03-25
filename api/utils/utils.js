const env = process.env.NODE_ENV === 'production' ? require('../../bin/env').production : require('../../bin/env').debug;
const fs = require('fs');
const Logs = require('./logger');
const path = require('path');

let temp;
let log;

try {
    temp = fs.opendirSync(path.join(__dirname, '../../logs'));
    console.log('Directory already exists');
} catch (ex) {
    fs.mkdirSync(path.join(__dirname, '../../logs'));
    try {
        temp = fs.opendirSync(path.join(__dirname, '../../logs'));
    } catch (ex) {
        console.trace(ex);
    }
} finally {
    temp.closeSync();
}

try {
    log = new Logs();
    log.log('Created logger');
} catch (err) {
    console.trace(err);
}

module.exports = utils = {
    checkLogin : function(/*db, */users, login) {
        /*
        let users = [];
        db.getUsers().then((data) => {
            for (let i = 0; i < data.length; i++) {
                users.push(data[i]);
            }

            for (let i = 0; i < users; i++) {
                if (login[0] === users[i].username) {
                    if (login[1] === users[i].password) {
                        return users[i];
                    } else {
                        return undefined;
                    }
                }
            }

            return undefined;
        }, (err) => {
            console.error(err);
            return undefined;
        })
        */

        for (let i = 0; i < users.length; i++) {
            if (login.username === users[i].Username)
                if (login.password === users[i].Password)
                    return users[i];
                else
                    return undefined;
        }
    },
    checkAuth : function(auth) {
        return auth[0] === env.apiAuth.username && auth[1] === env.apiAuth.password;
    },
    unAuth: function(auth, res) {
        logs.error('Unauthorized attempt to use API', auth)
        res.sendStatus(401);
    },
    noAuth: function(res) {
        logs.error('Attempt to use API without authorization');
        res.sendStatus(401);
    },
    logs: log
}