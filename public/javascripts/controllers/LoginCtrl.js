angular.module('LoginCtrl', []).controller('LoginController', function($scope, $cookies, $login, $route, $env, $mdDialog) {
    /*let loginLink = document.querySelector('#login-link');*/

    $scope.login = {};
    $scope.remember = false;

    $scope.loginUser = function() {
        $login.login($scope.login).then(res => {
            if (res.status === 200) {
                alert(`Welcome Back, ${res.data.DisplayName}`);
                let exdays = 1;

                if ($scope.login.remember) {
                    exdays = 365;
                }

                $cookies.putObject('user', res.data, $env.cookie(exdays));
                $cookies.put('remember', $scope.login.remember, $env.cookie(exdays));
                $mdDialog.hide();
                $route.reload();
            }
        }, fail => {
            alert('Please try again')
            document.querySelector('#password').value = "";
        })
    }
})