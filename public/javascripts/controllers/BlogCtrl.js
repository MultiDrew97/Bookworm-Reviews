angular.module('BlogCtrl', []).controller('BlogController', function($scope, $routeParams, $blogPost) {
    const username = 'admin';
    const password = 'password';
    const auth = btoa(`${username}:${password}`);
    // TODO: Figure out how to read from a file on the server to get the blog post text
    $scope.name = $routeParams.blogID;

    $scope.bookTitle = 'Vixen';
    $scope.blogPubDate = Date.now();
    $scope.bookAuthor = 'Jillian Larkin';



    $scope.submitComment = () => {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        $scope.commentForm = new FormData(document.querySelector('#create-comment'));

        console.debug($scope.commentForm);
    }
    /*$scope.paragraphs = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at sem pretium erat suscipit pulvinar. Nam tincidunt imperdiet mi, quis tristique massa accumsan vel. Curabitur fringilla venenatis porta. Proin posuere dictum scelerisque. Nulla vel viverra quam. Phasellus vestibulum mauris consequat lorem maximus cursus. Vivamus placerat posuere ipsum, vel viverra dolor sagittis sed. Suspendisse malesuada neque vitae velit facilisis venenatis. Nulla facilisi. Integer semper varius mi, ut viverra purus blandit eu. Curabitur tempor semper nisl, ac egestas augue efficitur vitae. Nulla ac lorem at turpis ultricies posuere et non est. Donec molestie neque metus, at fermentum eros consectetur sit amet. Phasellus consectetur nibh eu mauris dictum sodales. Maecenas diam nunc, euismod et nisi vitae, gravida feugiat ante.',
        'Donec a ornare neque. Aliquam tincidunt metus eget sem gravida porttitor. Fusce nec rhoncus risus. Quisque fermentum vitae dui quis pretium. Sed sodales laoreet turpis eu volutpat. Aliquam scelerisque suscipit turpis, laoreet efficitur leo. Vivamus blandit odio et tellus pellentesque malesuada. Donec placerat sapien metus, in dictum augue eleifend at. Nam finibus purus non egestas rutrum. Phasellus id imperdiet erat. Donec mattis rhoncus massa non imperdiet. Nam urna odio, iaculis non nulla sed, facilisis porta eros. Proin elementum nulla at nisi aliquet, sed interdum magna consequat. Suspendisse bibendum, neque ut posuere sodales, nibh lorem maximus diam, at vehicula diam tortor at libero. Etiam semper tellus ac metus vehicula, sed dictum tellus euismod.',
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi molestie at nulla eget commodo. Nulla facilisi. Nulla urna ante, dignissim eget libero a, rhoncus imperdiet metus. Duis accumsan, lacus non pulvinar aliquet, nisl tortor pulvinar diam, vitae sagittis tellus urna nec eros. Vestibulum at turpis eros. Phasellus euismod, metus et maximus finibus, tortor purus lacinia justo, id aliquam orci dui non erat. Nunc consequat auctor diam, a aliquam leo hendrerit sed. In sed tortor magna. Pellentesque non lacus sagittis, volutpat justo a, mollis augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam eleifend cursus aliquet. Nulla diam justo, fringilla at auctor in, congue quis augue. Curabitur bibendum, leo eget fringilla molestie, tortor dui condimentum ligula, sed congue velit magna in nisi. Integer in metus vitae orci maximus tincidunt quis ut erat. Aliquam vitae felis dignissim nibh pretium luctus."];*/
    // TODO: Learn how to find files within javascript to get the data from the blog file

    const loadBlog = (id) => {
        /*
            Load the blog text using the API to send the blog text and then parse and post onto the webpage

            @param id The ID of the blog to be used to find the text of it
         */

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                printParagraphs(this.responseText.split('\n'));
            }
        });

        xhr.open("GET", `/api/blogpost?id=${id}`, true);
        xhr.setRequestHeader("Authorization", `Basic ${auth}`);
        /*xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");*/

        xhr.send(/*data*/);
    }

    const printParagraphs = (data = ['']) => {
        const blogText = document.querySelector('#blog-text');

        for (let i = 0; i < data.length; i++) {
            if (data[i]) {
                let p = document.createElement('p');
                p.className = 'text';
                /*p.innerHTML = '<span style="{margin-left: 40px;}"></span>';*/
                p.innerHTML = `<span style="margin-left: 40px;"></span>${data[i]}`;
                blogText.appendChild(p);
            }
        }
    }

    loadBlog($routeParams.blogID)
});