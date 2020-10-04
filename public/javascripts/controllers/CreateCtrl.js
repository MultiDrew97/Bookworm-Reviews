angular.module('CreateCtrl', []).controller('CreateController', function($scope, $cookies, $blogPost, user) {
    if (user) {
        user = JSON.parse(user);
        $scope.accountType = user.type
    }

    $scope.accountType = ''

    console.log($scope.accountType);

    // TODO: Use this when creating a blog post to upload the cover image
    if ($scope.accountType === 'admin') {
        document.querySelector('#coverSelect').addEventListener('change', function (event) {
            $scope.coverFile = event.target.files[0];
        })
    }

    $scope.createPost = function() {
        $blogPost.post($scope.blogPost).then(success => {
            $blogPost.uploadCover(success.data.newID, $scope.coverFile).then(success =>{}, failure => {
                console.error(failure);
            });
        }, failure => {
            console.error(failure);
        });
    }
})