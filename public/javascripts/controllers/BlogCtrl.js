angular.module('BlogCtrl', []).controller('BlogController', function(blogInfo, blogText, comments, $scope/*, $blogPost, $route*/) {
    // TODO: Figure out how to read from a file on the server to get the blog post text
    $scope.blog = blogInfo.data;
    $scope.paragraphs = blogText.data.split('\n\n');
    $scope.commentation = {};
    // $scope.comments = comments.data;

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
            body: 'Another test comment to get a feel for how the comment section will look',
            date: Date.now(),
            votes: {
                up: 10,
                down: 3
            }
        }
    ]

    $scope.submitComment = () => {
        let comment = {
            author: $scope.commentation.commenter || 'Anonymous',
            body: $scope.comment
        }

        console.debug(comment);
        // $route.reload();
        /*comment.blogID = $scope.blog._id;
        comment.commenter = $scope.commentation.commenter || 'Anonymous';

        $blogPost.comment(comment);*/
    }


    $scope.$on('$viewContentLoaded', function() {
        // TODO: Place any loading here
    })
});