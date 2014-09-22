define([
    'autosize'
], function () {
    // @ngInject
    var AutosizeDirective = function () {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                $element.autosize();
            }
        };
    };

    return AutosizeDirective;
});
