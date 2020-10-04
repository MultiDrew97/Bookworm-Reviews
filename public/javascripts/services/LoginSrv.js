angular.module('LoginSrv', []).service('$login', function($http, $cookies, $crypto, $env) {
    const apiAuth = $crypto.encode(`${$env.apiAuth.username}:${$env.apiAuth.password}`);

    return {
        login: function (login) {
            return $http.get(`/api/login?p0=${$crypto.encode(`${login.username}:${login.password}`)}`, {
                headers: {
                    authorization: `Basic ${apiAuth}`,
                    withCredentials: true
                }
            })
        },
        logout: function () {
            $cookies.remove('user');
            $cookies.remove('remember');
        },
        password: function (login, newPassword) {
            return $http.post(`/api/login?p0=${login}`, newPassword, {
                headers: {
                    authorization: `Basic ${apiAuth}`,
                    withCredentials: true
                }
            })
        }
    }
})