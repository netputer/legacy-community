define(function () {
    var PostController = function ($scope, $routeParams, GroupService) {
        var scope = this;

        scope.message = '';
        scope.pictures = [];
        // scope.pictures = [
        //     '9852e745981746eda5cf1f61d3ac5208_596_596.jpeg',
        //     '60b7e8e9c5d4e572662536afc4e26dc8_596_441.jpeg'
        // ];

        scope.uploadBefore = function () {
            console.log('scope before');
        };

        scope.uploadProgress = function (e, data) {
            console.log('scope progress - e', e);
            console.log('scope progress - data', data);
        };

        scope.uploadDone = function (e, data) {
            console.log('scope done - e', e);
            console.log('scope done - data', data);

            var result = data.result;

            if (result.code === 0) {
                $scope.$apply(function () {
                    scope.pictures.push(result.msg);

                    if (scope.message.length === 0) {
                        scope.message = '我只发图不说话';
                    }
                });
            }
        };

        scope.uploadFail = function (e, data) {
            console.log('scope fail - e', e);
            console.log('scope fail - data', data);
        };

        scope.deletePicture = function (pic) {
            var index = scope.pictures.indexOf(pic);
            scope.pictures.splice(index, 1);

            if (scope.pictures.length === 0 && scope.message === '我只发图不说话') {
                scope.message = '';
            }
        };

        scope.postTopic = function () {
            GroupService.postTopic({
                groupId: $routeParams.id,
                message: scope.message,
                pictures: scope.pictures
            }).then(function (xhr) {
                console.log(xhr);
            });
        };
    };

    PostController.$inject = ['$scope', '$routeParams', 'GroupService'];

    return PostController;
});
