angular.module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', '$provide', ($routeProvider, $locationProvider, $provide) => {
        $provide.decorator('$sniffer', function($delegate) {
            $delegate.history = false;
            return $delegate;
        });

        $routeProvider
            // home page
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController',
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
            .when('/request', {
                templateUrl: 'views/review_request.html',
                controller: 'RequestController'
            })

            // TODO: Learn how to pass the blogID to the url and retrieve it in the path
            // Blog post
            .when('/blogs/:id', {
                templateUrl: 'views/blogPost.html',
                controller: 'BlogController',
                resolve: {
                    blogInfo: function ($blogPost, $route) {
                        return $blogPost.find($route.current.params.id);
                    },
                    blogText: function ($blogPost, $route) {
                        return $blogPost.getText($route.current.params.id);
                    }
                }
            })

            // Blog Post creation page
            .when('/admin/create', {
                templateUrl: 'views/createBlog.html',
                controller: 'CreateController',
                resolve: {
                    user : function($cookies) {
                        if ($cookies.get('user'))
                            return JSON.parse($cookies.get('user'));
                        else
                            return {};
                    }
                }
            })

            // Search Page
            .when('/search', {
                templateUrl: 'views/search.html',
                controller: 'SearchController',
                resolve: {
                    advanced: function($blogPost, $route) {
                        return $route.current.params.advanced;
                        //return $blogPost.search($route.current.params.p0);
                    }
                }
            })

            // 404 Error page
            .when('/404', {
                templateUrl: 'views/404.html'
            })

            // Redirect to Not Found 404 error page
            .otherwise({
                redirectTo: '/404'
            });

        $locationProvider.html5Mode({
            requireBase: false,
            enabled: true,
            hashPrefix: '!'
        });
    }]);