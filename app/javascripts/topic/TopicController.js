define([
    'jquery',
    'lodash'
], function (
    $,
    _
) {
    // @ngInject
    var TopicController = function ($scope, $rootScope, $routeParams, $location, GroupService, $timeout, AccountService) {
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
        var $textarea;
        var loadedPictures = 0;
        var metaPosition;

        var getScrollContainer = function () {
            if ($scrollContainer !== undefined) {
                return;
            }

            $scrollContainer = $('.modal-content');

            if ($scrollContainer.length === 0) {
                $scrollContainer = $('body');
            }
        };

        var getMetaPosition = function () {
            getScrollContainer();

            $meta = $('.js-meta-bar');
            return $meta.offset().top + $meta.outerHeight();
        };

        scope.onScroll = function (e) {
            if (metaPosition === undefined) {
                return;
            }

            $scope.$apply(function () {
                scope.showFixed = $scrollContainer.scrollTop() > metaPosition;
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

        var focusTextarea = function () {
            if ($textarea === undefined) {
                $textarea = $('.g-publish textarea');
            }

            $textarea.focus();
        };

        scope.scrollToEnd = function () {
            $scrollContainer.animate({
                scrollTop: $scrollContainer[0].scrollHeight
            });

            scope.parentReply = {};
            focusTextarea();
        };

        scope.returnGroup = function () {
            $location.path('/' + scope.topic.group.id);
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
                    scope.returnGroup();
                });
            }
        };

        scope.editTopic = function () {
            $location.path('/topic/' + topicId + '/edit');
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
            if (!scope.topic.group.curUserRole && !confirm('需要加入小组才能发表回复话题，确认加入小组？')) {
                return;
            }

            var message = scope.message;

            if (!message && scope.pictures.length > 0) {
                message = '我只发图不说话';
            }

            GroupService.postComment({
                topicId: topicId,
                message: message,
                pictures: scope.pictures,
                parentId: scope.parentReply.id
            }).then(function (xhr) {
                console.log('postComment', xhr.data);
                scope.replies.push(xhr.data);

                scope.message = null;
                scope.pictures = [];
                scope.parentReply = {};
                scope.placeholder = '';

                scope.topic.group.curUserRole = 'GROUP_MEMBER';
            });
        };

        scope.replyComment = function (reply) {
            scope.parentReply = reply;
            focusTextarea();
        };

        scope.deleteComment = function (reply) {
            GroupService.deleteComment({
                replyId: reply.id
            }).then(function (xhr) {
                var index = scope.replies.indexOf(reply);
                scope.replies.splice(index, 1);
            });
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

        GroupService.getTopicDetail({
            topicId: topicId
        }).then(function (xhr) {
            var topic = xhr.data;

            scope.topic = topic;

            GroupService.getGroupDetail({
                groupId: topic.group.id
            }).then(function (xhr) {
                scope.group = xhr.data;
            });

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

    return TopicController;
});
