angular.module('LoginCtrl', []).controller('LoginController', function($scope, $cookies, $login) {
    $scope.loginUser = function() {
        $login.checkLogin($scope.login).then(res => {
            console.log(res);
        })

    }
})