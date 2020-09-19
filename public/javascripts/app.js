angular
    .module('Bookworm Reviews',
        [
            'ngRoute', 'ngCookies', 'ngMaterial', 'ngAria', 'appRoutes', 'MainCtrl', 'AboutCtrl', 'BlogCtrl', 'RequestCtrl', 'CreateCtrl', 'LoginCtrl',
            'BlogPostSrv', 'EnvSrv', 'CryptoSrv'
        ]);