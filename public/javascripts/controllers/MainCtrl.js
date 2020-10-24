angular.module('MainCtrl', []).controller('MainController', function($scope, $route, $cookies, $location, $login, $mdDialog) {
    const loginLink = document.querySelector('#login-link');

    const checkInterval = setInterval(() => {
        if ($cookies.get('user')) {
            clearInterval(checkInterval);
            loginLink.innerText = 'Logout';
        }
    }, 100);

    window.addEventListener('beforeunload', () => {
        if (!$cookies.get('remember')) {
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

    $scope.search = function(path, advanced) {
        /*
            Allow the use of the search buttons
         */
        $location.path(path).search('advanced', advanced);
    }

    $scope.changePath = function(path) {
        /*
            Change the path in the url box to different pathings
         */
        $location.path(path);
        $location.search('advanced', null);
    }
})