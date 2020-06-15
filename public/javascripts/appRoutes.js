angular.module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
        $routeProvider
            // home page
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainController'
            })

            // About page that will use the AboutCtrl
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutController'
            })

            // Review Request that page will use the RequestCtrl
            .when('/review_request', {
                templateUrl: 'views/review_request.html',
                controller: 'RequestController'
            });
        $locationProvider.html5Mode(true);
        // TODO: Create all of the routes that will be used for the website.
        //  this only has a few of the routes but there are more routes planned
    }]);