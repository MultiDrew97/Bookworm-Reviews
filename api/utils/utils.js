const env = process.env.NODE_ENV === 'production' ? require('../../bin/env').production : require('../../bin/env').debug;
const db = new (require('../../api/utils/db'))(env.database.username)

module.exports = utils = {
    checkLogin : function(users, login) {
        // let users = [];
        // db.getUsers().then((data) => {
        //     for (let i = 0; i < data.length; i++) {
        //         users.push(data[i]);
        //     }
        //
        //     for (let i = 0; i < users; i++) {
        //         if (login[0] === users[i].username) {
        //             if (login[1] === users[i].password) {
        //                 return users[i];
        //             } else {
        //                 return undefined;
        //             }
        //         }
        //     }
        //
        //     return undefined;
        // }, (err) => {
        //     console.error(err);
        //     return undefined;
        // })

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
    }
}