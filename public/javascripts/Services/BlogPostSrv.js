angular.module('BlogPostSrv', []).service('$blogPost', function($http) {
    return {
        get : function(auth) {
            return $http.get('/api/blogs', { headers: {
                authorization: `Basic ${auth}`
                }});
            },
        get: function(id, auth){
            return $http.get('/api/blogs?id=' + id, {headers: {
                    authorization : `Basic ${auth}`
                }}).$$state;
        },
        create : function(blogPost, auth) {
            $http.headers.authorization = `Basic ${auth}`;
            return $http.post('/api/blogs', blogPost);
            },
        delete : function(id, auth) {
            $http.headers.authorization = `Basic ${auth}`;
            return $http.delete('/api/blogs?id=' + id);
        }
    }
});