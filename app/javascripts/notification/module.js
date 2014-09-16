define([
    'angular',
    'notification/NotificationController'
], function (
    angular,
    NotificationController
) {
    angular.module('cmtyNotification', [])

    .controller('NotificationController', NotificationController);
});
