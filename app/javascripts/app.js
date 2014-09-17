define([
    'angular',

    'text!../templates/list.html',
    'text!../templates/group.html',
    'text!../templates/post.html',
    'text!../templates/topic.html',
    'text!../templates/notification.html',

    'ngRoute',
    'ngAnimate',
    'ngInfiniteScroll',
    'uiBootstrap',

    'common/module',
    'account/module',
    'list/module',
    'group/module',
    'topic/module',
    'notification/module'
], function (
    angular,

    listTemplate,
    groupTemplate,
    postTemplate,
    topicTemplate,
    notificationTemplate
) {
    angular.module('cmtyApp', [
        'ngRoute',
        'ngAnimate',
        'infinite-scroll',
        'ui.bootstrap',

        'cmtyCommon',
        'cmtyAccount',
        'cmtyList',
        'cmtyGroup',
        'cmtyTopic',
        'cmtyNotification'
    ]).config(function ($httpProvider, $locationProvider, $routeProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
            var key;
            var result = [];

            for (key in data) {
                if (data.hasOwnProperty(key) && data[key] !== undefined) {
                    if (angular.isObject(data[key])) {
                        data[key] = JSON.stringify(data[key]);
                    }

                    result.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
                }
            }

            return result.join('&');
        });

        $locationProvider.html5Mode(true);

        $routeProvider.when('/', {
            controller: 'ListController',
            controllerAs: 'ctrl',
            template: listTemplate
        }).when('/notification', {
            controller: 'NotificationController',
            controllerAs: 'ctrl',
            template: notificationTemplate
        }).when('/:id', {
            controller: 'GroupController',
            controllerAs: 'ctrl',
            template: groupTemplate
        }).when('/:id/post', {
            controller: 'PostController',
            controllerAs: 'ctrl',
            template: postTemplate
        }).when('/topic/:id', {
            controller: 'TopicController',
            controllerAs: 'ctrl',
            template: topicTemplate
        }).otherwise({
            redirectTo: '/'
        });
    });
});
