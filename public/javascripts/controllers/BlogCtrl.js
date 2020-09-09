angular.module('BlogCtrl', []).controller('BlogController', function(blogInfo, blogText, $scope, $routeParams, $blogPost, $http, $crypto, $env, $route) {
    const username = 'admin';
    const password = 'password';
    const apiAuth = $crypto.encode(`${$env.apiAuth.username}:${$env.apiAuth.password}`);
    // TODO: Figure out how to read from a file on the server to get the blog post text
    $scope.blog = blogInfo.data;
    $scope.paragraphs = blogText.data.split('\n\n');

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
        $route.reload();
        /*$scope.commentation.blogID = $scope.blog._id;
        $scope.commentation.commenter = $scope.commentation.commenter || 'Anonymous';

        $blogPost.comment($scope.commentation);*/
    }

    //  TODO: Move this to the blog creation page when created
    /*document.querySelector('#coverSelect').addEventListener('change', function(event) {
        $scope.coverFile = event.target.files[0];
    })

    $scope.sendImage = function() {
        const data = new FormData();
        data.append('coverFile', $scope.coverFile, 'CoverFile.png');

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function() {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        })
        xhr.open('PUT', `/api/cover?id=${$routeParams.blogID}`);
        xhr.setRequestHeader('Authorization', `Basic ${apiAuth}`);
        xhr.send(data);
    }*/


    $scope.$on('$viewContentLoaded', function() {
        // TODO: Place any loading here
    })
});