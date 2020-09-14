angular
    .module('Bookworm Reviews',
        [
            'ngRoute', 'ngCookies', 'appRoutes', 'MainCtrl', 'AboutCtrl', 'BlogCtrl', 'RequestCtrl', 'CreateCtrl',
            'BlogPostSrv', 'EnvSrv', 'CryptoSrv'
        ]);