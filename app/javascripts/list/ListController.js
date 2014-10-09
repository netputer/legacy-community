define(function () {
    // @ngInject
    var ListController = function ($scope, $location, GroupService) {
        var scope = this;

        scope.currentTab = 'GAME';

        scope.groups = [];
        scope.startId = 0;
        scope.busy = false;
        scope.hasMore = true;

        scope.redirectToGroup = function (id) {
            $location.path('/' + id);
        };

        scope.switchTabTo = function (current) {
            if (scope.busy) {
                return;
            }

            if (scope.currentTab === current) {
                return;
            }

            scope.currentTab = current;
            scope.startId = 0;
            scope.loadMoreGroups(true);
        };

        scope.loadMoreGroups = function (reset) {
            if (scope.busy) {
                return;
            }

            if (!reset && !scope.hasMore) {
                return;
            }

            scope.busy = true;

            GroupService.getGroupList({
                subjectType: scope.currentTab,
                start: scope.startId,
                max: 10
            }).then(function (xhr) {
                var items = xhr.data.items;

                if (reset) {
                    scope.startId = items.length;
                    scope.groups = items;
                } else {
                    scope.startId = scope.startId + items.length;
                    scope.groups = scope.groups.concat(items);
                }

                scope.busy = false;
                scope.hasMore = xhr.data.hasMore && items.length > 0;
            });
        };

        scope.loadMoreGroups();
    };

    return ListController;
});
