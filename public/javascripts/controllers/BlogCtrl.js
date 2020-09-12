angular.module('BlogCtrl', []).controller('BlogController', function(blogInfo, blogText, $scope, $routeParams, $blogPost, $http, $crypto, $env, $route) {
    const username = 'admin';
    const password = 'password';
    const apiAuth = $crypto.encode(`${$env.apiAuth.username}:${$env.apiAuth.password}`);
    // TODO: Finish styling the blog post page
    $scope.blog = blogInfo.data;
    $scope.paragraphs = blogText.data.split('\n\n');
    $scope.comments = [];

    for (let i = 0; i < $scope.blog.comments.length; i++) {
        $blogPost.getComment($scope.blog.comments[i]).then(resolve => {
            console.debug(`Comment ${i + 1}:`, resolve.data);
            $scope.comments.push(resolve.data);
        })
    }

    /*$scope.bookTitle = 'Vixen';
    $scope.blogPubDate = Date.now();
    $scope.bookAuthor = 'Jillian Larkin';
    $scope.comments = [
        {
            id: 1,
            commenter: 'Anonymous',
            body: 'Test comment to see how it will look when users comment on the posts',
            date: Date.now(),
            votes: {
                up: 0,
                down: 0
            }
        }, {
            id: 2,
            commenter: 'Jasmine T.',
            body: 'Another test commment to get a feel for how the comment section will look',
            date: Date.now(),
            votes: {
                up: 10,
                down: 3
            }
        }
    ]*/

    $scope.submitComment = () => {
        /*let comment = {
            author: $scope.commenter || 'Anonymous',
            body: $scope.comment,
            date: Date.now(),
            votes: {
                up: 0,
                down: 0
            }
        }*/

        $scope.commentation.blogID = $scope.blog._id;
        $scope.commentation.commenter = $scope.commentation.commenter || 'Anonymous';

        $blogPost.comment($scope.commentation).then(resolve => {
            console.log(resolve);
            $route.reload();
        });
    }

    $scope.$on('$viewContentLoaded', function() {

    })
});