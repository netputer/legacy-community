define(function () {
    // @ngInject
    var GroupService = function ($http) {
        var API_ROOT = 'http://group.wandoujia.com/api/v1';

        if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) {
            API_ROOT = 'http://www.wandoujia.com/api/group/v1';
        }

        return {
            getGroupList: function (options) {
                options = options || {};

                return $http({
                    method: 'GET',
                    url: API_ROOT + '/groups/list',
                    params: {
                        'subject_type': options.subjectType,
                        'start': options.start,
                        'max': options.max
                    }
                });
            },
            getGroupDetail: function (options) {
                options = options || {};

                return $http({
                    method: 'GET',
                    url: API_ROOT + '/groups/' + options.groupId
                });
            },
            getGroupTopic: function (options) {
                options = options || {};
                options.type = Number(!!options.isFeatured);

                return $http({
                    method: 'GET',
                    url: API_ROOT + '/topics/list',
                    params: {
                        'group_id': options.groupId,
                        'start': options.start,
                        'after_id': options.afterId,
                        'max': options.max,
                        'type': options.type
                    }
                });
            },
            getGroupMember: function (options) {
                options = options || {};

                return $http({
                    method: 'GET',
                    url: API_ROOT + '/groups/' + options.groupId + '/members',
                    params: {
                        'role': options.role,
                        'start': options.start,
                        'max': options.max
                    }
                });
            },
            joinGroup: function (options) {
                options = options || {};

                return $http({
                    method: 'POST',
                    url: API_ROOT + '/groups/' + options.groupId + '/members/add'
                });
            },
            leaveGroup: function (options) {
                options = options || {};

                return $http({
                    method: 'POST',
                    url: API_ROOT + '/groups/' + options.groupId + '/members/remove'
                });
            },
            updateGroupRole: function (options) {
                options = options || {};

                return $http({
                    method: 'POST',
                    url: API_ROOT + '/groups/' + options.groupId + '/members/update',
                    data: {
                        'uid': options.uid,
                        'toRole': options.toRole
                    }
                });
            },
            getTopicDetail: function (options) {
                options = options || {};

                return $http({
                    method: 'GET',
                    url: API_ROOT + '/topics/' + options.topicId
                });
            },
            getTopicLikes: function (options) {
                options = options || {};

                return $http({
                    method: 'GET',
                    url: API_ROOT + '/topics/' + options.topicId + '/likesUsers',
                    params: {
                        'start': options.start,
                        'max': options.max
                    }
                });
            },
            getTopicReplies: function (options) {
                options = options || {};

                return $http({
                    method: 'GET',
                    url: API_ROOT + '/replies/list',
                    params: {
                        'topic_id': options.topicId,
                        'start': options.start,
                        'after_id': options.afterId,
                        'max': options.max
                    }
                });
            },
            postTopic: function (options) {
                options = options || {};

                var pictures = options.pictures || '';

                if (options.pictures instanceof Array) {
                    pictures = options.pictures.join(',');
                }

                if (pictures.length === 0) {
                    pictures = undefined;
                }

                return $http({
                    method: 'POST',
                    url: API_ROOT + '/topics/add',
                    data: {
                        'group_id': options.groupId,
                        'message': options.message,
                        'pictures': pictures
                    }
                });
            },
            likeTopic: function (options) {
                options = options || {};

                return $http({
                    method: 'POST',
                    url: API_ROOT + '/topics/' + options.topicId + '/vote',
                    data: {
                        value: 1
                    }
                });
            },
            stickTopic: function (options) {
                options = options || {};

                return $http({
                    method: 'POST',
                    url: API_ROOT + '/topics/' + options.topicId + '/stick',
                    data: {
                        value: options.value
                    }
                });
            },
            featureTopic: function (options) {
                options = options || {};

                return $http({
                    method: 'POST',
                    url: API_ROOT + '/topics/' + options.topicId + '/feature',
                    data: {
                        value: options.value
                    }
                });
            },
            deleteTopic: function (options) {
                options = options || {};

                return $http({
                    method: 'POST',
                    url: API_ROOT + '/topics/' + options.topicId + '/remove'
                });
            },
            editTopic: function (options) {
                options = options || {};

                var pictures = options.pictures || '';

                if (options.pictures instanceof Array) {
                    pictures = options.pictures.join(',');
                }

                if (pictures.length === 0) {
                    pictures = undefined;
                }

                return $http({
                    method: 'POST',
                    url: API_ROOT + '/topics/' + options.topicId + '/edit',
                    data: {
                        'message': options.message,
                        'pictures': pictures
                    }
                });
            },
            postComment: function (options) {
                options = options || {};

                var pictures = options.pictures || '';

                if (options.pictures instanceof Array) {
                    pictures = options.pictures.join(',');
                }

                if (pictures.length === 0) {
                    pictures = undefined;
                }

                return $http({
                    method: 'POST',
                    url: API_ROOT + '/replies/add',
                    data: {
                        'topic_id': options.topicId,
                        'message': options.message,
                        'picture': pictures,
                        'parent_reply_id': options.parentId
                    }
                });
            },
            deleteComment: function (options) {
                options = options || {};

                return $http({
                    method: 'POST',
                    url: API_ROOT + '/replies/' + options.replyId + '/remove'
                });
            },
            getNotifications: function (options) {
                options = options || {};

                return $http({
                    method: 'GET',
                    url: API_ROOT + '/notifications/list',
                    params: {
                        'start': options.start,
                        'after_id': options.afterId,
                        'max': options.max
                    }
                });
            },
            getUnreadNotificationsCount: function (options) {
                options = options || {};

                return $http({
                    method: 'GET',
                    url: API_ROOT + '/notifications/news_count'
                });
            }
        };
    };

    return GroupService;
});
