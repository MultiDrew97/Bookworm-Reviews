angular.module('CreateCtrl', []).controller('CreateController', function($scope, $cookies, $blogPost) {
    // TODO: Use this when creating a blog post to upload the cover image
    /*document.querySelector('#coverSelect').addEventListener('change', function(event) {
        $scope.coverFile = event.target.files[0];
    })*/

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
    }
})