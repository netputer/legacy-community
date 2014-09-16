define(function () {
    var UploadDirective = function (UploadService) {
        return {
            restrict: 'A',
            scope: {
                'before': '&uploadBefore',
                'progress': '&uploadProgress',
                'done': '&uploadDone',
                'fail': '&uploadFail'
            },
            link: function ($scope, $element, $attrs) {
                $element.on('change', function () {
                    UploadService.upload({
                        $file: $(this),
                        before: function (e, data) {
                            return $scope.before();
                        },
                        progress: function (e, data) {
                            return $scope.progress({
                                e: e,
                                data: data
                            });
                        },
                        done: function (e, data) {
                            return $scope.done({
                                e: e,
                                data: data
                            });
                        },
                        fail: function (e, data) {
                            return $scope.fail({
                                e: e,
                                data: data
                            });
                        }
                    });
                });
            }
        };
    };

    UploadDirective.$inject = ['UploadService'];

    return UploadDirective;
});


