angular.module('LogoutCtrl', []).controller('LogoutController', function($scope, $cookies, $mdDialog, $login, $location, $route) {
    $scope.name = (JSON.parse($cookies.get('user'))).displayName;
    $scope.timer = 3;
    $login.logout();

    let timer = setInterval(function() {
        document.querySelector('#timer').innerText = $scope.timer - 1;
        $scope.timer -= 1;

        if ($scope.timer === 0) {
            clearInterval(timer);
        }
    }, 1000);

    setTimeout(function() {
        $location.path('/');
        $route.reload();
        $mdDialog.hide();
    }, 3000);
})