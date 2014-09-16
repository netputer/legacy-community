define([
    'text!../../templates/pagination.html'
],function (
    paginationTemplate
) {
    var PaginationDirective = function () {
        return {
            restrict: 'A',
            template: paginationTemplate,
            scope: {
                total: '=',
                size: '=',
                range: '=',
                callback: '&'
            },
            link: function ($scope, $element, $attrs) {
                $element.attr('unselectable', 'on')
                        .on('selectstart', false);
            },
            controller: function ($scope, $element, $attrs) {
                $scope.current = 1;

                $scope.gotoPrev = function () {
                    if ($scope.current > 1) {
                        $scope.gotoPage($scope.current - 1);
                    }
                };

                $scope.gotoNext = function () {
                    if ($scope.current < $scope.maxPage) {
                        $scope.gotoPage($scope.current + 1);
                    }
                };

                $scope.gotoPage = function (num) {
                    if (num < 1) {
                        return;
                    }

                    if (num > $scope.maxPage) {
                        return;
                    }

                    $scope.current = num;

                    $scope.callback({page: num});
                };

                $scope.getPages = function () {
                    if (!$scope.total) {
                        return;
                    }

                    $scope.maxPage = Math.ceil($scope.total / $scope.size);

                    var range = parseInt($scope.range, 10);
                    var left = (range + 1) / 2;
                    var right = (range - 1) / 2;

                    var start = 0;
                    var count = 0;

                    if ($scope.maxPage - $scope.current < right) {
                        start = $scope.maxPage - range + 1;
                    } else {
                        start = $scope.current - left + 1;
                    }

                    start = Math.max(start, 1);

                    if ($scope.maxPage - start < range) {
                        count = $scope.maxPage - start + 1;
                    } else {
                        count = range;
                    }

                    var pages = [];

                    pages.push({
                        num: 1
                    }, {
                        num: 0
                    });

                    if (start === 1 ){
                        start++;
                        count--;
                    } else if (start > 2) {
                        pages.push({
                            num: 0
                        }, {
                            num: 0
                        });
                    }

                    var end = start + count - 1;

                    if (end === $scope.maxPage) {
                        end--;
                    }

                    if (start <= end) {
                        var i;
                        for (i = start; i <= end; i ++) {
                            pages.push({
                                num: i
                            }, {
                                num: 0
                            });
                        }
                    }

                    if (end < $scope.maxPage - 1) {
                        pages.push({
                            num: 0
                        }, {
                            num: 0
                        });
                    }

                    pages.push({
                        num: $scope.maxPage
                    });

                    $scope.pages = pages;
                };

                $scope.$watch('current', $scope.getPages);
                $scope.$watch('total', $scope.getPages);
            }
        };
    };

    return PaginationDirective;
});
