angular.module('LoginSrv', []).service('$login', function($http, $cookies, $crypto, $env) {
    this.login = function(login) {
        return $http.get(`/api/login?p0=${$crypto.encode(`${login.username}:${login.password}`)}`, {headers: {
                authorization: `Basic ${$crypto.encode(`${$env.apiAuth.username}:${$env.apiAuth.password}`)}`,
                withCredentials: true
            }})
    }

    this.logout = function() {
        $cookies.remove('user');
    }
})