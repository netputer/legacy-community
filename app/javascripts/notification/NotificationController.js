define(function () {
    var NotificationController = function ($scope, GroupService, ModalService) {
        $scope.notifications = [];
        $scope.afterId = 0;
        $scope.max = 5;
        $scope.busy = false;
        $scope.hasMore = true;

        $scope.loadMoreNotifications = function () {
            if ($scope.busy || !$scope.hasMore) {
                return;
            }

            $scope.busy = true;

            GroupService.getNotifications({
                afterId: $scope.afterId,
                max: 10
            }).then(function (xhr) {
                var items = xhr.data.items;

                if (items.length > 0) {
                    $scope.notifications = $scope.notifications.concat(items);
                    $scope.afterId = items[items.length - 1].id;
                }

                $scope.busy = false;
                $scope.hasMore = xhr.data.hasMore && items.length > 0;
            });
        };

        $scope.showTopic = function (topicId) {
            ModalService.show(topicId);
        };

        $scope.loadMoreNotifications();
    };

    NotificationController.$inject = ['$scope', 'GroupService', 'ModalService'];

    return NotificationController;
});
