angular.module('MainCtrl', []).controller('MainController', function($scope, $route, $cookies, $location, $login, $mdDialog) {
    const loginLink = document.querySelector('#login-link');

    window.addEventListener('beforeunload', () => {
        if ($cookies.get('remember') === 'false') {
            $login.logout();
        }
    })

    $scope.popup = function(ev) {
        let popup = {
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        }

        if(loginLink.innerText === 'Login') {
            popup.controller = 'LoginController';
            popup.templateUrl = 'views/login.html';
        } else if(loginLink.innerText === 'Logout') {
            popup.controller = 'LogoutController';
            popup.templateUrl = 'views/logout.html';
            popup.clickOutsideToClose = false;
        }

        $mdDialog.show(popup);
    }

    $scope.$on('$viewContentLoaded', function() {
        if ($cookies.get('user')) {
            loginLink.innerText = 'Logout';
        } else {
            loginLink.innerText = 'Login'
        }
    })

    const checkInterval = setInterval(() => {
        if ($cookies.get('user')) {
            console.debug('user found')
            console.debug($cookies.get('user'));
            clearInterval(checkInterval);
            loginLink.innerText = 'Logout';
        }
    }, 100);

    $scope.search = function(path, advanced) {
        $location.path(path).search('advanced', advanced);
    }

    $scope.changePath = function(path) {
        $location.path(path);
        $location.search('advanced', null);
    }
})