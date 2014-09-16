define([
    'angular',
    'account/AccountService',
    'account/AccountController'
], function (
    angular,
    AccountService,
    AccountController
) {
    angular.module('cmtyAccount', [])

    .factory('AccountService', AccountService)
    .controller('AccountController', AccountController);
});
