define([
    'angular',
    'group/ModalContentDirective',
    'group/GroupController',
    'group/PostController'
], function (
    angular,
    ModalContentDirective,
    GroupController,
    PostController
) {
    angular.module('cmtyGroup', [])

    .directive('modalContent', ModalContentDirective)
    .controller('GroupController', GroupController)
    .controller('PostController', PostController);
});
