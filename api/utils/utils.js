const env = require('../../bin/enviroment');

module.exports = utils = {
    checkLogin : function(login) {
        let username = login.split(':')[0];
        let password = login.split(':')[1];

        for (let login = 0; login < env.logins.length; login++) {
            if (username === env.logins[login].username && password === env.logins[login].password) {
                return env.logins[login];
            }
        }

        return undefined;
    },
    checkAuth : function(username, password) {
        for (let user = 0; user < env.apiAuth.length; user++) {
            if (username === env.apiAuth[user].username && password === env.apiAuth[user].password) {
                return true;
            }
        }

        return false;
    }
}