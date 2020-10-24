const env = require('../../bin/env');

module.exports = utils = {
    checkLogin : function(login) {
        for (let user = 0; user < env.logins.length; user++) {
            if (login[0] === env.logins[user].username && login[1] === env.logins[user].password) {
                return env.logins[user];
            }
        }

        return undefined;
    },
    checkAuth : function(auth) {
        for (let user = 0; user < env.apiAuth.length; user++) {
            if (auth[0] === env.apiAuth[user].username && auth[1] === env.apiAuth[user].password) {
                return true;
            }
        }

        return false;
    }
}