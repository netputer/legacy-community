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
        // jshint ignore:start
        // Fix: IE8 without `Array.prototype.indexOf`
        Array.prototype.indexOf = Array.prototype.indexOf || function indexOf(item, i) {
            if (this == null) throw new TypeError();
            var array = Object(this), length = array.length >>> 0;
            if (length === 0) return -1;
            i = Number(i);
            if (isNaN(i)) {
                i = 0;
            } else if (i !== 0 && isFinite(i)) {
                i = (i > 0 ? 1 : -1) * Math.floor(Math.abs(i));
            }
            if (i > length) return -1;
            var k = i >= 0 ? i : Math.max(length - Math.abs(i), 0);
            for (; k < length; k++)
                if (k in array && array[k] === item) return k;
            return -1;
        };
        // jshint ignore:end

        // Fix: CORS request without cookies
        $httpProvider.defaults.withCredentials = true;

        // Fix: Angular POST without processing formdata
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

        $httpProvider.interceptors.push('cmtyHttpInterceptor');

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
    }).run(function ($window, $rootScope, $location) {
        window._gaq = window._gaq || [];
        window._gaq.push(['_setAccount', 'UA-15790641-56']);

        $rootScope.$on('$locationChangeSuccess', function () {
            window._gaq.push(['_trackPageview', $location.url()]);
        });
    });
});
