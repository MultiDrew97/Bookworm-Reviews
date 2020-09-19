angular.module('MainCtrl', []).controller('MainController', function($scope, blogs, $login) {
    $scope.blogs = blogs.data;
    const loginLink = document.querySelector('#login-link');
    const ngClick = document.createAttribute('ng-click');
    ngClick.value = 'loginPopup()';

    window.addEventListener('beforeunload', e => {
        if (!$cookies.get('remember')) {
            $login.logout();
        }
    })

    const checkInterval = setInterval(() => {
        if ($cookies.get('credentials')) {
            console.debug('credentials found')
            clearInterval(checkInterval);
            loginLink.innerText = 'Logout';
            loginLink.attributes.getNamedItem('href').value = '/logout'
            loginLink.attributes.getNamedItem('ng-href').value = '/logout'
            loginLink.attributes.removeNamedItem('ng-click')
        }
    }, 100);
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
        if ($cookies.get('credentials')) {
            loginLink.innerText = 'Logout';
            loginLink.attributes.getNamedItem('ng-href').value = '/logout'
            loginLink.attributes.getNamedItem('ng-click').value = ''
        } else {
            loginLink.innerText = 'Login'
            loginLink.attributes.getNamedItem('ng-href').value = '{{ $location.path }}'
            loginLink.attributes.getNamedItem('href').value = '{{ $location.path }}'
            if (!loginLink.attributes.getNamedItem('ng-click'))
                loginLink.attributes.setNamedItem(ngClick);
        }
    })

    $scope.loginPopup = function($mdDialog) {
        if(loginLink.innerText === 'Login') {
            $mdDialog.show({
                controller: 'LoginController',
                templateUrl: 'views/login.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
                .then(result => {
                }, err => {
                })
        }
    }
});

/*
let MainCtrl = () => {
    // place controller code here for the body of index page
    function loadPage() {
        clearSearchBox();
        loadBlogPosts();
    }

    function clearSearchBox() {
        let searchBox = document.getElementById('SearchBox');
        searchBox.value = null;
    }

    function loadBlogPosts() {

    }

    ['$scope', '$http', 'blogPost', function($scope, $http, blogPost) {
    $scope.formData = {};
    $scope.loading = true;
    $http.get('/api/blogPosts').
    then(function(response) {
        $scope.bookTitle = response.data.bookTitle;
        $scope.bookAuthor = response.data.bookAuthor;
        $scope.bookPublicationDate = response.data.bookPublicationDate;
    });

    // create
    // when submitting the add form, send the text to the node API
    $scope.createBlogPost = function() {
        //validate the formData to make sure that something is there
        //if form is empty, nothing will happen
        if ($scope.formData.bookTitle !== undefined) {
            $scope.loading = true;

            // call the create function from the service (returns a promise object
            BlogPost.create($scope.formData)

            //if successful creation, call the get function to get all the new blogPost's info
                .then(function(response) {
              $scope.bookTitle = response.data.bookTitle;
                    $scope.loading = false;
                    $scope.formData = {}
            }, function (error) {});
        }
    };

    //delete
    $scope.deleteBlogPost = function(id) {
        $scope.loading = true;
        BlogPost.delete(id)
        // if successful delete, call the get function to get all the new BlogPost data
            .then(function(response) {
                $scope.loading = false;
                //new list of BlogPost
            });
    };
}]
};

angular
    .module('Bookworm Reviews')
    .controller('MainCtrl', MainCtrl);*/
