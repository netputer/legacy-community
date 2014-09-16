define([
    'angular',
    'list/ListController',
    'common/GroupService'
], function (
    angular,
    ListController
) {
    angular.module('cmtyList', [
        // 'cmtyCommon'
    ])

    .controller('ListController', ListController);
});
