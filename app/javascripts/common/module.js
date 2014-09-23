define([
    'angular',
    'common/HttpInterceptor',
    'common/GroupService',
    'common/UploadService',
    'common/AutosizeDirective',
    'common/PaginationDirective',
    'common/UploadDirective',
    'common/RelativeFilter'
], function (
    angular,
    HttpInterceptor,
    GroupService,
    UploadService,
    AutosizeDirective,
    PaginationDirective,
    UploadDirective,
    RelativeFilter
) {
    angular.module('cmtyCommon', [])

    .factory('cmtyHttpInterceptor', HttpInterceptor)
    .factory('GroupService', GroupService)
    .factory('UploadService', UploadService)
    .directive('cmtyAutosize', AutosizeDirective)
    .directive('cmtyPagination', PaginationDirective)
    .directive('cmtyUpload', UploadDirective)
    .filter('relative', RelativeFilter);
});
