require.config({
    paths: {
        'jquery': '../components/jquery/dist/jquery',
        'lodash': '../components/lodash/dist/lodash.compat',
        'angular': '../components/angular/angular',
        'ngRoute': '../components/angular-route/angular-route',
        'ngAnimate': '../components/angular-animate/angular-animate',
        'ngInfiniteScroll': '../components/ngInfiniteScroll/build/ng-infinite-scroll',
        'uiBootstrap': 'vendor/ui-bootstrap-custom-tpls-0.11.0',
        'wdjAccount': '../components/WandouLabs-AccountJavaScriptSDK/dist/snappea-account-hook',
        'fileupload': '../components/jquery-file-upload/js/jquery.fileupload',
        'jquery.ui.widget': '../components/jquery-file-upload/js/vendor/jquery.ui.widget',
        'autosize': '../components/jquery-autosize/jquery.autosize',
        'text': '../components/requirejs-text/text'
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'ngRoute': ['angular'],
        'ngAnimate': ['angular'],
        'ngInfiniteScroll': ['angular'],
        'uiBootstrap': ['angular'],
        'wdjAccount': {
            deps: ['jquery'],
            exports: 'SnapPea.AccountHook'
        },
        'fileupload': {
            deps: [
                'jquery',
                'jquery.ui.widget',
                '../components/jquery-file-upload/js/jquery.iframe-transport'
            ],
            exports: 'jquery'
        },
        'autosize': ['jquery']
    }
});

require([
    'angular',
    'app'
], function (
    angular
) {
    angular.bootstrap(document, ['cmtyApp']);
});
