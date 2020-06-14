angular.module('BlogPostService', [])
.factory('BlogPost', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/blog_posts');
        },
        create : function(blogPost) {
            return $http.post('/api/blog_posts/send', blogPost);
        },
        delete : function(id) {
            return $http.delete('/api/blog_posts/' + id);
        }
    }
}]);