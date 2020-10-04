angular.module('SearchCtrl', []).controller('SearchController', function($scope, $blogPost, advanced) {
    $scope.advancedSearch = advanced;

    $scope.advanced = {};

    $scope.search = function() {
        let criteria = {}

        if (advanced) {
            console.log($scope.advanced);
            /*$blogPost.search($scope.advanced);*/
        } else {
            console.log($scope.normal);
            criteria.bookTitle = `/${$scope.normal}/i`
            criteria.bookAuthor = `/${$scope.normal}/i`
            //$blogPost.search(JSON.stringify(criteria))
        }
    }
})