define(function () {
    // @ngInject
    var ListController = function ($scope, $location, GroupService) {
        var scope = this;

        scope.groups = [];
        scope.startId = 0;
        scope.busy = false;
        scope.hasMore = true;

        scope.redirectToGroup = function (id) {
            $location.path('/' + id);
        };

        scope.loadMoreGroups = function () {
            if (scope.busy || !scope.hasMore) {
                return;
            }

            scope.busy = true;

            GroupService.getGroupList({
                start: scope.startId,
                max: 10
            }).then(function (xhr) {
                scope.startId = scope.startId + xhr.data.items.length;
                scope.groups = scope.groups.concat(xhr.data.items);
                scope.busy = false;
                scope.hasMore = xhr.data.hasMore;
            });
        };

        scope.loadMoreGroups();
    };

    return ListController;
});
