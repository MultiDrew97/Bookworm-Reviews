angular.module('BlogCtrl', []).controller('BlogController', function($scope, $routeParams) {
    let blog = `./blogs/${$routeParams.blogID}.txt`

    // TODO: Figure out how to read from a file on the server to get the blog post text
    /*fs.readFile(blog, 'utf-8', (err, data) => {
        if (err) throw err;

        $scope.blogText = data;
    })*/

    /*var file = XMLHttpRequest();
    file.open('GET', blog, false);
    file.onreadystatechange = function() {
        if (file.readyState === 4) {
            if (file.status === 200 || file.status === 0) {
                $scope.blogText = file.responseText;
            }
        }
    }*/

    $scope.name = $routeParams.blogID;

    $scope.bookTitle = 'Vixen';
    $scope.bookPubDate = Date.now();
    $scope.blogPubDate = Date.now();
    $scope.bookAuthor = 'Jillian Larkin';

    $scope.paragraphs = ['Paragraph 1', 'Paragraph 2', "Paragraph 3"];
    // TODO: Learn how to find files within javascript to get the data from the blog file
});