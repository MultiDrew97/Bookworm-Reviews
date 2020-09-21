angular.module('MainCtrl', []).controller('MainController', function($scope, $cookies, $location, $login, $mdDialog) {
    const loginLink = document.querySelector('#login-link');
    const ngClick = document.createAttribute('ng-click');
    ngClick.value = 'loginPopup()';

    window.addEventListener('beforeunload', () => {
        if (!$cookies.get('remember')) {
            $login.logout();
        }
    })

    const checkInterval = setInterval(() => {
        if ($cookies.get('user')) {
            console.debug('user found')
            clearInterval(checkInterval);
            loginLink.innerText = 'Logout';
            loginLink.attributes.getNamedItem('href').value = '/logout'
            loginLink.attributes.getNamedItem('ng-href').value = '/logout'
            loginLink.attributes.removeNamedItem('ng-click')
        }
    }, 100);

    $scope.popup = function(ev) {
        if(loginLink.innerText === 'Login') {
            $mdDialog.show({
                controller: 'LoginController',
                templateUrl: 'views/login.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
        } else if(loginLink.innerText === 'Logout') {
            $mdDialog.show({
                controller: 'LogoutController',
                templateUrl: 'views/logout.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
            })
        }
    }

    $scope.$on('$viewContentLoaded', function() {
        if ($cookies.get('user')) {
            loginLink.innerText = 'Logout';
        } else {
            loginLink.innerText = 'Login'
        }
    })
})