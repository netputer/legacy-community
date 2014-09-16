define([
    'lodash'
], function (
    _
) {
    var ParentScrollDirective = function () {
        return {
            restrict: 'A',
            scope: {
                'onScroll': '&cmtyParentScroll'
            },
            link: function ($scope, $element, $attrs) {
                var $scrollContainer = $('.modal-content');

                $scrollContainer.on('scroll', _.throttle(function (e) {
                    $scope.onScroll({
                        event: e
                    });
                }, 200));
            }
        };
    };

    return ParentScrollDirective;
});
