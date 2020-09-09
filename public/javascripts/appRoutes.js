angular.module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider, $routeParams) => {
        $routeProvider
            // home page
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainController',
                resolve: {
                    blogs: function($blogPost) {
                        return $blogPost.get();
                    }
                }
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
            })

            // TODO: Learn how to pass the blogID to the url and retrieve it in the path
            // Blog post
            .when('/blogs', {
                templateUrl: 'views/blogPost.html',
                controller: 'BlogController',
                resolve: {
                    blogInfo: function ($blogPost, $route) {
                        return $blogPost.find(/*$route.current.params.blogID*/'5ee252bd61b4cd0924026465');
                    },
                    blogText: function ($blogPost, $route) {
                        return $blogPost.getText($route.current.params.id);
                    }
                }
            })

            // Not Found 404 error page
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
        // TODO: Create all of the routes that will be used for the website.
        //  this only has a few of the routes but there are more routes planned
    }]);