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
                templateUrl: 'views/request.html',
                controller: 'RequestController'
            })

            // TODO: Learn how to pass the blogID to the url and retrieve it in the path
            // Blog Post
            .when('/blogs', {
                templateUrl: 'views/blogPost.html',
                controller: 'BlogController'
            })

            // TODO: Figure out how to handle login information to allow only her to post
            // Login Page
            .when('/login', {
                templateUrl: '/views/login.html',
                controller: 'LoginController'
            })

            // Not Found 404 error page
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
        // TODO: Create all of the routes that will be used for the website.
        //  this only has a few of the routes but there are more routes planned
    }]);