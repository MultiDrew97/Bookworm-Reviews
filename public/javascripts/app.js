angular
    .module('Bookworm Reviews',
        [
            'ngRoute', 'ngCookies', 'ngMaterial', 'ngAria', 'appRoutes',
            'MainCtrl', 'HomeCtrl', 'AboutCtrl', 'BlogCtrl', 'RequestCtrl',
            'CreateCtrl', 'LoginCtrl', 'LogoutCtrl', 'SearchCtrl',
            'BlogPostSrv', 'EnvSrv', 'CryptoSrv', 'LoginSrv'
        ]);