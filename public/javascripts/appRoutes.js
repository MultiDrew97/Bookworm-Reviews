angular.module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
        $routeProvider
            // home page
            .when('/', {
                templateUrl: 'index.html',
                controller: 'MainController'
            })

            // students page that will use the StudentController
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutController'
            })

            .when('/review_request', {
                templateUrl: 'views/review_request',
                controller: 'RequestController'
            });
        $locationProvider.html5Mode(true);

        // TODO: Create all of the routes that will be used for the website.
        //  this only has a few of the routes but there are more routes planned
    }]);