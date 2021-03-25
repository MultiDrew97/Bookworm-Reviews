angular.module('SearchCtrl', []).controller('SearchController', function($scope, $blogPost, type) {
    $scope.searchType = type;
    console.log($scope.searchType);

    $scope.criteria = {
        advanced: {},
        normal: ""
    };

    $scope.search = function() {
        let searchCriteria;

        switch (type) {
            case 'advanced':
                searchCriteria = {
                    bookTitle: $scope.criteria.advanced.bookTitle,
                    bookAuthor: $scope.criteria.advanced.bookAuthor
                };
                break;
            case 'normal':
                searchCriteria = {
                    value: $scope.criteria.normal
                };
                break;
            default:

        }

        console.debug(searchCriteria);

        $blogPost.search(searchCriteria).then(blogs => {
            $scope.blogs = blogs.data
            console.debug($scope.blogs)
        }, fail => {
            console.error('Failed to perform the search');
            console.trace(fail)
        })
    }

    $scope.$on('viewContentLoaded', () => {

    })
})