angular.module('LoginSrv', []).service('$login', function($http, $cookies) {
    this.checkLogin = function(login) {

    }

    this.logout = function() {
        $cookies.remove('credentials');
    }
})