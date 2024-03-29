define([
    'text!../../templates/topic.html'
], function (
    topicTemplate
) {
    // @ngInject
    // var ModalService = function ($modal, $rootScope, $location, $route, $window) {
    var ModalService = function ($location) {
        return {
            show: function (topicId) {
                $location.path('topic/' + topicId);

                // $rootScope.modalTopicId = topicId;

                // var topicModal = $modal.open({
                //     template: topicTemplate,
                //     controller: 'TopicController as ctrl',
                //     windowClass: 'g-modal'
                // });

                // var targetPath = '/topic/' + topicId;
                // var originalPath = $location.path();
                // var originalRoute = $route.current;
                // var urlPrefix = $location.absUrl().replace(originalPath, '');

                // var cancelEvent = $rootScope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl) {
                //     $route.current = originalRoute;

                //     if (newUrl !== urlPrefix + targetPath) {
                //         if (!!topicModal) {
                //             topicModal.close();
                //         }

                //         cancelEvent();
                //     }
                // });

                // topicModal.opened.then(function () {
                //     $location.path(targetPath);
                // });

                // topicModal.result.then(function () {}, function () {
                //     $window.history.back();
                // })['finally'](function(){
                //     topicModal = undefined;
                // });
            }
        };
    };

    return ModalService;
});
