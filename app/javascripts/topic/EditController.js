define([
    'lodash'
], function (
    _
) {
    // @ngInject
    var PostController = function ($scope, $routeParams, $location, GroupService) {
        var scope = this;

        scope.message = '';
        scope.pictures = [];

        scope.gotoTopic = function () {
            $location.path('/topic/' + $routeParams.id);
        };

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
                    scope.placeholder = '我只发图不说话';
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

            if (scope.pictures.length === 0) {
                scope.placeholder = '';
            }
        };

        scope.postTopic = function () {
            var message = scope.message;

            if (!message && scope.pictures.length > 0) {
                message = '我只发图不说话';
            }

            GroupService.editTopic({
                topicId: $routeParams.id,
                message: message,
                pictures: scope.pictures
            }).then(function (xhr) {
                if (!!xhr.data.id) {
                    $location.path('/topic/' + $routeParams.id);
                }
            });
        };

        GroupService.getTopicDetail({
            topicId: $routeParams.id
        }).then(function (xhr) {
            var topic = xhr.data;

            scope.groupName = topic.group.title;
            scope.message = topic.message;

            scope.pictures = _.map(topic.pictures, function (picture) {
                return picture.storeKey;
            });
        });
    };

    return PostController;
});
