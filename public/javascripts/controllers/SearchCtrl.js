angular.module('SearchCtrl', []).controller('SearchController', function($scope, $blogPost, advanced) {
    $scope.advancedSearch = advanced;
    console.log($scope.advancedSearch);

    $scope.criteria = {
        advanced: {},
        normal: ""
    };

    $scope.search = function() {
        let searchCriteria;

        if (advanced) {
            searchCriteria = {
                bookTitle: $scope.criteria.advanced.bookTitle,
                bookAuthor: $scope.criteria.advanced.bookAuthor
            };
        } else {
            searchCriteria = {
                value: $scope.criteria.normal
            };
        }

        console.debug(searchCriteria);

        $blogPost.search(searchCriteria).then(blogs => {
            console.debug(blogs)
        }, fail => {
            console.error('Failed to perform the search');
            console.trace(fail)
        })
    }
})