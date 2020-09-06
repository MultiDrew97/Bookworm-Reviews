angular
    .module('Bookworm Reviews',
        [
            'ngRoute', 'ngCookies', 'appRoutes', 'MainCtrl', 'AboutCtrl', 'BlogCtrl', 'RequestCtrl',
            'BlogPostSrv', 'EnvSrv', 'CryptoSrv'
        ]);