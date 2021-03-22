angular.module('CreateCtrl', []).controller('CreateController', function($scope, $cookies, $blogPost, user) {
    $scope.bloggerAccount = user['UserType'] === 'blogger';
    console.log(user['type']);


    console.log($scope.bloggerAccount);

    $scope.createPost = function() {
        console.debug($scope.coverFile);
        // $blogPost.post($scope.blogPost).then(success => {
        //     $blogPost.uploadCover(success.data.newID, $scope.coverFile).then(success =>{}, failure => {
        //         console.error(failure);
        //     });
        // }, failure => {
        //     console.error(failure);
        // });
    }

    $scope.getCoverFile = function () {
        // TODO: Use this when creating a blog post to upload the cover image
        $scope.coverFile = event.target.files[0];
        console.debug($scope.coverFile);
    }

    $scope.$on("$viewContentLoaded", function() {

    })
})