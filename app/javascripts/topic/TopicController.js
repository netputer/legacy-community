define([
    'jquery',
    'lodash'
], function (
    $,
    _
) {
    var TopicController = function ($scope, $rootScope, $routeParams, GroupService, $timeout, AccountService) {
        var scope = this;
        var topicId = $rootScope.modalTopicId || $routeParams.id;
        $rootScope.modalTopicId = undefined;

        scope.replies = [];
        scope.busy = false;
        scope.max = 10;

        scope.parentReply = {};
        scope.message = '';
        scope.pictures = [];

        var $scrollContainer;
        var $meta;
        var totalPictures = 0;
        var loadedPictures = 0;
        var metaPosition;

        var getBottomPosition = function () {
            $scrollContainer = $('.modal-content');

            if ($scrollContainer.length === 0) {
                return;
            }

            scope.bottomPosition = $scrollContainer[0].scrollHeight;
        };

        var getMetaPosition = function () {
            getBottomPosition();

            $meta = $('.js-meta-bar');
            return $meta.position().top + $meta.outerHeight();
        };

        scope.onScroll = function (e) {
            if (metaPosition === undefined) {
                return;
            }

            $scope.$apply(function () {
                scope.showFixed = e.target.scrollTop > metaPosition;
            });
        };

        // $scope.$watch(function () {
        //     return metaPosition;
        // }, function (newValue) {
        //     console.log('metaPosition', newValue);
        // });

        scope.pictureLoaded = _.throttle(function () {
            metaPosition = getMetaPosition();
        }, 500);

        scope.scrollToEnd = function () {
            $scrollContainer.animate({
                scrollTop: scope.bottomPosition
            });
        };

        scope.likeTopic = function () {
            AccountService.getUser().then(function (user) {
                scope.likes.unshift({
                    avatar: user.data.avatar,
                    nick: user.data.nick,
                    uid: user.data.uid
                });

                scope.topic.isCurUserLiked = true;
            });

            GroupService.likeTopic({
                topicId: topicId
            }).then(function (xhr) {
                console.log('like', xhr.data);
            });
        };

        scope.stickTopic = function (value) {
            GroupService.stickTopic({
                topicId: topicId,
                value: value + 0
            }).then(function (xhr) {
                if (xhr.data.code === 0) {
                    scope.topic.isSticky = value;
                }
            });
        };

        scope.deleteTopic = function () {
            if (confirm('确认删除这个话题？')) {
                GroupService.deleteTopic({
                    topicId: topicId
                }).then(function (xhr) {
                    console.log(xhr.data);
                });
            }
        };

        var scrollToTopReply = function () {
            $scrollContainer.animate({
                scrollTop: metaPosition
            });
        };

        scope.loadReplies = function (pageNum, userTriggered) {
            if (scope.busy) {
                return;
            }

            pageNum = pageNum || 1;

            var start = (pageNum - 1) * scope.max;

            // scope.busy = true;

            GroupService.getTopicReplies({
                topicId: topicId,
                start: start,
                max: scope.max
            }).then(function (xhr) {
                scope.replies = xhr.data.items;
                // scope.busy = false;
                scope.totalCount = xhr.data.totalCount;

                // console.log(xhr.data);

                if (!!userTriggered) {
                    scrollToTopReply();
                }
            });
        };

        scope.postComment = function () {
            // return console.log('pre po', {
            //     topicId: topicId,
            //     message: scope.message,
            //     picture: scope.pictures,
            //     parentId: scope.parentReply.id
            // });

            GroupService.postComment({
                topicId: topicId,
                message: scope.message,
                picture: scope.pictures,
                parentId: scope.parentReply.id
            }).then(function (xhr) {
                console.log('postComment', xhr.data);
                scope.replies.push(xhr.data);

                scope.message = null;
                scope.pictures = [];
                scope.parentReply = {};
            });
        };

        scope.replyComment = function (reply) {
            scope.parentReply = reply;

            // Scroll to reply box
            // UX Notice: Make sure parentId correct
        };

        scope.deleteComment = function (reply) {
            var index = scope.replies.indexOf(reply);
            scope.replies.splice(index, 1);

            // GroupService.deleteComment({
            //     replyId: reply.id
            // }).then(function (xhr) {
            //     console.log('deleteComment', xhr.data);
            // });
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

            if (scope.pictures.indexOf(result.msg) > -1) {
                console.log('duplicated');
                return;
            }

            if (result.code === 0) {
                $scope.$apply(function () {
                    scope.pictures.push(result.msg);
                });
            }
        };

        scope.uploadFail = function (e, data) {
            console.log('scope fail - e', e);
            console.log('scope fail - data', data);
        };

        GroupService.getTopicDetail({
            topicId: topicId
        }).then(function (xhr) {
            var topic = xhr.data;

            scope.topic = topic;

            if (topic.pictures.length > 0) {
                totalPictures = topic.pictures.length;
            }

            // if has image then listen to those image load event
            // else timeout and then get its position

            $timeout(function () {
                metaPosition = getMetaPosition();
            });
        });

        GroupService.getTopicLikes({
            topicId: topicId,
            max: 20
        }).then(function (xhr) {
            scope.likes = xhr.data.items;
        });

        scope.loadReplies();

        AccountService.getUser().then(function (user) {
            scope.isLoggedIn = user.isLoggedIn;
            scope.user = user.data;
        });
    };

    TopicController.$inject = ['$scope', '$rootScope', '$routeParams', 'GroupService', '$timeout', 'AccountService'];

    return TopicController;
});
