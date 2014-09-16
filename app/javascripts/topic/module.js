define([
    'angular',
    'topic/ModalService',
    'topic/TopicController',
    'topic/LoadDirective',
    'topic/ParentScrollDirective'
], function (
    angular,
    ModalService,
    TopicController,
    LoadDirective,
    ParentScrollDirective
) {
    angular.module('cmtyTopic', [])

    .factory('ModalService', ModalService)
    .directive('cmtyLoad', LoadDirective)
    .directive('cmtyParentScroll', ParentScrollDirective)
    .controller('TopicController', TopicController);
});
