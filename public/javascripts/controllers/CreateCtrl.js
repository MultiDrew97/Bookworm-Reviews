angular.module('CreateCtrl', []).controller('CreateController', function($scope, $cookies, $blogPost, user) {
    $scope.bloggerAccount = user['type'] === 'blogger';
    console.log(user['type']);


    console.log($scope.bloggerAccount);

    // TODO: Use this when creating a blog post to upload the cover image
    if ($scope.accountType === 'blogger') {
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