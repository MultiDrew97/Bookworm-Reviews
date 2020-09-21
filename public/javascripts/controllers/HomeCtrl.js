angular.module('HomeCtrl', []).controller('HomeController', function($scope, $login, $cookies, $location, $mdDialog, blogs) {
    $scope.blogs = blogs.data;

    /*$scope.blogs = [{
        blogID: 123,
        bookTitle: "Vixen",
        bookAuthor: "Jillian Larkin",
        bookPubDate: Date.now(),
        description: "Flappers in the 1920s..."
    }, {
        blogID: 234,
        bookTitle: "Ready Player One",
        bookAuthor: "Ernest Cline",
        bookPubDate: Date.now(),
        description: "Sample description of the book"
    }, {
        blogID: 345,
        bookTitle: "The Life We Bury",
        bookAuthor: "Allen Eskens",
        bookPubDate: Date.now(),
        description: "Sample description of the book"
    }, {
        blogID: 456,
        bookTitle: "Astrophysics",
        bookAuthor: "Niel DeGrasse Tyson",
        bookPubDate: Date.now(),
        description: "Sample description of the book"
    }
    ];*/

    $scope.$on('$viewContentLoaded', function() {
        // TODO: Use this to load any data needed

    })
});
