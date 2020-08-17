angular.module('BlogCtrl', []).controller('BlogController', function($scope, $routeParams) {
    $scope.name = $routeParams.blogID;

    // TODO: Learn how to find files within javascript to get the data from the blog file
});