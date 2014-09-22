define([
    'lodash'
], function (
    _
) {
    // @ngInject
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

        var removeMemberFromNormal = function (normalMember) {
            var summaryIndex = _.findIndex(scope.membersSummary, function (member) {
                return normalMember.uid === member.uid;
            });

            var membersIndex = _.findIndex(scope.members, function (member) {
                return normalMember.uid === member.uid;
            });

            if (summaryIndex > -1) {
                scope.membersSummary.splice(summaryIndex, 1);
            }

            if (membersIndex > -1) {
               scope.members.splice(membersIndex, 1);
            }
        };

        scope.joinGroup = function () {
            AccountService.getUser().then(function (user) {
                GroupService.joinGroup({
                    groupId: $routeParams.id
                }).then(function (xhr) {
                    var userObj = {
                        avatar: user.data.avatar,
                        nick: user.data.nick,
                        uid: user.data.uid
                    };

                    scope.membersSummary.unshift(userObj);
                    scope.members.unshift(userObj);

                    scope.group.curUserRole = 'GROUP_MEMBER';
                });
            });
        };

        scope.leaveGroup = function () {
            AccountService.getUser().then(function (user) {
                removeMemberFromNormal({
                    uid: user.data.uid
                });

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

                if (items.length > 0) {
                    scope.topics = scope.topics.concat(items);
                    scope.afterId = items[items.length - 1].id;
                }

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
            GroupService.updateGroupRole({
                groupId: $routeParams.id,
                uid: member.uid,
                toRole: 'GROUP_ADMIN'
            }).then(function (xhr) {
                removeMemberFromNormal(member);
                scope.admins.push(member);

                AccountService.getUser().then(function (user) {
                    if (member.uid === user.data.uid) {
                        scope.group.curUserRole = 'GROUP_ADMIN';
                    }
                });
            });
        };

        scope.setAsBlock = function (member) {
            GroupService.updateGroupRole({
                groupId: $routeParams.id,
                uid: member.uid,
                toRole: 'GROUP_BLACKUSER'
            }).then(function (xhr) {
                removeMemberFromNormal(member);
                scope.blocks.push(member);

                AccountService.getUser().then(function (user) {
                    if (member.uid === user.data.uid) {
                        scope.group.curUserRole = 'GROUP_BLACKUSER';
                    }
                });
            });
        };

        scope.setAsNormal = function (member, from) {
            GroupService.updateGroupRole({
                groupId: $routeParams.id,
                uid: member.uid,
                toRole: 'GROUP_MEMBER'
            }).then(function (xhr) {
                switch (from) {
                case 'GROUP_ADMIN':
                    var adminsIndex = scope.admins.indexOf(member);

                    if (adminsIndex > -1) {
                        scope.admins.splice(adminsIndex, 1);
                    }

                    break;

                case 'GROUP_BLACKUSER':
                    var blocksIndex = scope.blocks.indexOf(member);

                    if (blocksIndex > -1) {
                        scope.blocks.splice(blocksIndex, 1);
                    }

                    break;
                }

                scope.members.unshift(member);
                scope.membersSummary.unshift(member);
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

    return GroupController;
});
