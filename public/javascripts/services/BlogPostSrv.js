angular.module('BlogPostSrv', []).service('$blogPost', function($http, $env, $crypto) {
    const apiAuth = `${$crypto.encode(`${$env.apiAuth.username}:${$env.apiAuth.password}`)}`;
    return {
        get : function() {
            return $http.get('/api/blogs', { headers: {
                withCredentials: true,
                authorization: `Basic ${apiAuth}`
            }});
        },
        find : function(id){
            return $http.get('/api/blogs?id=' + id, {headers: {
                withCredentials: true,
                authorization : `Basic ${apiAuth}`
            }});
        },
        post : function(blogPost) {
            return $http.post('/api/blogs', blogPost, {headers: {
                withCredentials: true,
                authorization: `Basic ${apiAuth}`
            }});
        },
        delete : function(id) {
            return $http.delete(`/api/blogs?id=${id}`, {headers: {
                withCredentials: true,
                authorization: `Basic ${apiAuth}`
            }});
        },
        comment : function(comment) {
            return $http.post(`/api/comment`, comment, {headers: {
                withCredentials: true,
                authorization: `Basic ${apiAuth}`
            }})
        },
        getText : function(id) {
            return $http.get(`/api/blogpost?id=${id}`, {
                headers: {
                    withCredentials: true,
                    authorization: `Basic ${apiAuth}`
                }
            })
        },
        getComment: function(id) {
            return $http.get(`/api/comment?id=${id}`, {
                headers: {
                    withCredentials: true,
                    authorization: `Basic ${apiAuth}`
                }
            })
        }
    }
});