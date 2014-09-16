define([
    'lodash'
], function (
    _
) {
    var GroupController = function ($scope, $location, $routeParams, GroupService, AccountService, ModalService) {
        var scope = this;

        scope.currentTab = 'topics';
        scope.currentMemberTab = 'all';

        scope.topics = [];
        scope.afterId = 0;
        scope.busy = false;
        scope.hasMore = true;

        scope.membersSummary = [];

        scope.admins = [];
        scope.members = [];
        scope.blocks = [];

        scope.joinGroup = function () {
            AccountService.getUser().then(function (user) {
                var userObj = {
                    avatar: user.data.avatar,
                    nick: user.data.nick,
                    uid: user.data.uid
                };

                scope.membersSummary.unshift(userObj);
                scope.members.unshift(userObj);

                scope.group.curUserRole = 'GROUP_MEMBER';
            });

            GroupService.joinGroup({
                groupId: $routeParams.id
            }).then(function (xhr) {
                console.log('join', xhr.data);
            });
        };

        scope.leaveGroup = function () {
            AccountService.getUser().then(function (user) {
                var summaryIndex = _.findIndex(scope.membersSummary, function (member) {
                    return member.uid === user.data.uid;
                });

                var membersIndex = _.findIndex(scope.members, function (member) {
                    return member.uid === user.data.uid;
                });

                if (summaryIndex > -1) {
                    scope.membersSummary.splice(summaryIndex, 1);
                }

                if (membersIndex > -1) {
                   scope.members.splice(membersIndex, 1);
                }

                scope.group.curUserRole = null;
            });

            GroupService.leaveGroup({
                groupId: $routeParams.id
            }).then(function (xhr) {
                console.log('leave', xhr.data);
            });
        };

        scope.showTopic = function (id) {
            ModalService.show(id);
        };

        scope.postTopic = function () {
            $location.path('/' + $routeParams.id + '/post');

            // $modal.open({
            //     templateUrl: 'templates/group-post.html',
            //     controller: 'GroupPostController',
            //     windowClass: 'g-modal'
            // }).result.then(null, function () {
            //     // $ngSilentLocation.silent(OriginalPath);
            // });
        };

        scope.loadMoreTopics = function () {
            if (scope.busy || !scope.hasMore) {
                return;
            }

            scope.busy = true;

            GroupService.getGroupTopic({
                groupId: $routeParams.id,
                afterId: scope.afterId,
                max: 10
            }).then(function (xhr) {
                var items = xhr.data.items;

                scope.topics = scope.topics.concat(items);
                scope.afterId = items[items.length - 1].id;
                scope.busy = false;
                scope.hasMore = xhr.data.hasMore && items.length > 0;
            });
        };

        scope.membersPerPage = 6 * 4;
        scope.totalMembers = 0;

        scope.showMembers = function (pageNum) {
            pageNum = pageNum || 1;

            var start = (pageNum - 1) * scope.membersPerPage;

            GroupService.getGroupMember({
                groupId: $routeParams.id,
                role: 'GROUP_MEMBER',
                start: start,
                max: scope.membersPerPage
            }).then(function (xhr) {
                scope.totalMembers = xhr.data.totalCount;
                scope.members = xhr.data.items;

                if (scope.membersSummary.length === 0) {
                    scope.membersSummary = xhr.data.items.slice();
                }
            });
        };

        scope.showMemberAdmins = function () {
            GroupService.getGroupMember({
                groupId: $routeParams.id,
                role: 'GROUP_ADMIN',
                max: 100
            }).then(function (xhr) {
                scope.admins = xhr.data.items;
            });
        };

        scope.showMemberBlocks = function () {
            GroupService.getGroupMember({
                groupId: $routeParams.id,
                role: 'GROUP_BLACKUSER',
                max: 100
            }).then(function (xhr) {
                scope.blocks = xhr.data.items;
            });
        };

        scope.setAsAdmin = function (member) {
            // scope.members.splice(scope.members.indexOf(member), 1);
            // scope.admins.push(member);

            // AccountService.getUser().then(function (user) {
            //     if (member.uid === user.data.uid) {
            //         scope.group.curUserRole = 'GROUP_ADMIN';
            //     }
            // });

            GroupService.updateGroupRole({
                groupId: $routeParams.id,
                uid: member.uid,
                toRole: 'GROUP_ADMIN'
            }).then(function (xhr) {
                console.log('set as admin', xhr.data);
            });
        };

        scope.setAsBlock = function (member) {
            // scope.members.splice(scope.members.indexOf(member), 1);
            // scope.blocks.push(member);

            // AccountService.getUser().then(function (user) {
            //     if (member.uid === user.data.uid) {
            //         scope.group.curUserRole = 'GROUP_BLACKUSER';
            //     }
            // });

            GroupService.updateGroupRole({
                groupId: $routeParams.id,
                uid: member.uid,
                toRole: 'GROUP_BLACKUSER'
            }).then(function (xhr) {
                console.log('set as block', xhr.data);
            });
        };

        scope.setAsNormal = function (member, from) {
            console.log(member);
            // if (from === 'GROUP_ADMIN') {
            //     scope.admins.splice(scope.admins.indexOf(member), 1);
            // } else {
            //     scope.blocks.splice(scope.blocks.indexOf(member), 1);
            // }

            // scope.members.unshift(member);
            // scope.membersSummary.unshift(member);

            GroupService.updateGroupRole({
                groupId: $routeParams.id,
                uid: member.uid,
                toRole: 'GROUP_MEMBER'
            }).then(function (xhr) {
                console.log('set as normal', xhr.data);
            });
        };

        GroupService.getGroupDetail({
            groupId: $routeParams.id
        }).then(function (xhr) {
            scope.group = xhr.data;
        });

        scope.showMembers();
        scope.loadMoreTopics();

        scope.showMemberAdmins();
        // scope.showMemberBlocks();
    };

    GroupController.$inject = ['$scope', '$location', '$routeParams', 'GroupService', 'AccountService', 'ModalService'];

    return GroupController;
});
