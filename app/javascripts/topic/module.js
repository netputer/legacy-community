define([
    'angular',
    'topic/ModalService',
    'topic/LoadDirective',
    'topic/ParentScrollDirective',
    'topic/TopicController'
], function (
    angular,
    ModalService,
    LoadDirective,
    ParentScrollDirective,
    TopicController
) {
    angular.module('cmtyTopic', [])

    .factory('ModalService', ModalService)
    .directive('cmtyLoad', LoadDirective)
    .directive('cmtyParentScroll', ParentScrollDirective)
    .controller('TopicController', TopicController);
});
