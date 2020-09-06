angular.module('BlogCtrl', []).controller('BlogController', function(blogInfo, blogText, $scope, $routeParams, $blogPost, $http, $crypto, $env) {
    const username = 'admin';
    const password = 'password';
    const apiAuth = $crypto.encode(`${$env.apiAuth.username}:${$env.apiAuth.password}`);
    // TODO: Figure out how to read from a file on the server to get the blog post text
    $scope.blog = blogInfo.data;
    $scope.paragraphs = blogText.data.split('\n');
    $scope.id = $routeParams.blogID;

    $scope.bookTitle = 'Vixen';
    $scope.blogPubDate = Date.now();
    $scope.bookAuthor = 'Jillian Larkin';
    $scope.comments = [
        {
            id: 1,
            commenter: 'Anonymous',
            body: 'Test comment to see how it will look when users comment on the posts',
            date: Date.now(),
            votes: {
                up: 0,
                down: 0
            }
        }, {
            id: 2,
            commenter: 'Jasmine T.',
            body: 'Another test commment to get a feel for how the comment section will look',
            date: Date.now(),
            votes: {
                up: 10,
                down: 3
            }
        }
    ]

    $scope.submitComment = () => {
        /*let comment = {
            author: $scope.commenter || 'Anonymous',
            body: $scope.comment,
            date: Date.now(),
            votes: {
                up: 0,
                down: 0
            }
        }*/
        $scope.comment.blogID = $scope.id;
        $scope.comment.commenter = $scope.comment.commenter || 'Anonymous';

        /*$blogPost.comment($scope.id, comment);*/
        console.debug($scope.comment);
    }
    /*$scope.paragraphs = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at sem pretium erat suscipit pulvinar. Nam tincidunt imperdiet mi, quis tristique massa accumsan vel. Curabitur fringilla venenatis porta. Proin posuere dictum scelerisque. Nulla vel viverra quam. Phasellus vestibulum mauris consequat lorem maximus cursus. Vivamus placerat posuere ipsum, vel viverra dolor sagittis sed. Suspendisse malesuada neque vitae velit facilisis venenatis. Nulla facilisi. Integer semper varius mi, ut viverra purus blandit eu. Curabitur tempor semper nisl, ac egestas augue efficitur vitae. Nulla ac lorem at turpis ultricies posuere et non est. Donec molestie neque metus, at fermentum eros consectetur sit amet. Phasellus consectetur nibh eu mauris dictum sodales. Maecenas diam nunc, euismod et nisi vitae, gravida feugiat ante.',
        'Donec a ornare neque. Aliquam tincidunt metus eget sem gravida porttitor. Fusce nec rhoncus risus. Quisque fermentum vitae dui quis pretium. Sed sodales laoreet turpis eu volutpat. Aliquam scelerisque suscipit turpis, laoreet efficitur leo. Vivamus blandit odio et tellus pellentesque malesuada. Donec placerat sapien metus, in dictum augue eleifend at. Nam finibus purus non egestas rutrum. Phasellus id imperdiet erat. Donec mattis rhoncus massa non imperdiet. Nam urna odio, iaculis non nulla sed, facilisis porta eros. Proin elementum nulla at nisi aliquet, sed interdum magna consequat. Suspendisse bibendum, neque ut posuere sodales, nibh lorem maximus diam, at vehicula diam tortor at libero. Etiam semper tellus ac metus vehicula, sed dictum tellus euismod.',
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi molestie at nulla eget commodo. Nulla facilisi. Nulla urna ante, dignissim eget libero a, rhoncus imperdiet metus. Duis accumsan, lacus non pulvinar aliquet, nisl tortor pulvinar diam, vitae sagittis tellus urna nec eros. Vestibulum at turpis eros. Phasellus euismod, metus et maximus finibus, tortor purus lacinia justo, id aliquam orci dui non erat. Nunc consequat auctor diam, a aliquam leo hendrerit sed. In sed tortor magna. Pellentesque non lacus sagittis, volutpat justo a, mollis augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam eleifend cursus aliquet. Nulla diam justo, fringilla at auctor in, congue quis augue. Curabitur bibendum, leo eget fringilla molestie, tortor dui condimentum ligula, sed congue velit magna in nisi. Integer in metus vitae orci maximus tincidunt quis ut erat. Aliquam vitae felis dignissim nibh pretium luctus."];*/
    // TODO: Learn how to find files within javascript to get the data from the blog file

    /*$scope.$on('$viewContentLoaded', function() {
        $http.get(`/api/blogpost?id=${$scope.id}`, {
            headers: {
                withCredentials: true,
                authorization: `Basic ${apiAuth}`
            }
        }).then(resolve => {
            $scope.paragraphs = resolve.data.split('\n');
        }, reject => {
            console.debug('Blog Text', reject);
        })

        /!*$http.get(`/api/comment?id=${$scope.id}`, {
            headers: {
                withCredentials: true,
                authorization: `Basic ${apiAuth}`
            }
        }).then(resolve => {

        }, reject => {
            console.debug('Comments:', reject)
        })*!/
    })*/
    /*const loadBlog = (id) => {
        /!*
            Load the blog text using the API to send the blog text and then parse and post onto the webpage

            @param id The ID of the blog to be used to find the text of it
         *!/

        $http.get(`/api/blogpost?id=${$scope.id}`, {
            headers: {
                withCredentials: true,
                authorization: `Basic ${apiAuth}`
            }
        }).then(success => {
            $scope.paragraphs = success.data.split('\n');
        })

        /!*var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                printParagraphs(this.responseText.split('\n'));
            }
        });

        xhr.open("GET", `/api/blogpost?id=${id}`, true);
        xhr.setRequestHeader("Authorization", `Basic ${auth}`);
        /!*xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");*!/

        xhr.send(/!*data*!/);*!/
    }

    const printParagraphs = (data = ['']) => {
        const blogText = document.querySelector('#blog-text');

        for (let i = 0; i < data.length; i++) {
            if (data[i]) {
                let p = document.createElement('p');
                p.className = 'text';
                p.innerHTML = `<span style="margin-left: 40px;"></span>${data[i]}`;
                blogText.appendChild(p);
            }
        }
    }

    loadBlog($routeParams.blogID)*/
});