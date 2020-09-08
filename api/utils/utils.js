const env = require('../../bin/enviroment');

module.exports = utils = {
    checkLogin : function(username, password) {
        for (let login = 0; login < env.logins.length; login++) {
            if (username === env.logins[login].username && password === env.logins[login].password) {
                return 200
            }
        }

        return 401;
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