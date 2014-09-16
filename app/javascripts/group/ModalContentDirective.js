define(function () {
    var ModalContentDirective = function ($window) {
        return {
            restrict: 'C',
            link: function ($scope, $element, $attrs) {
                $element.css('max-height', $window.innerHeight - 60);
            }
        };
    };

    ModalContentDirective.$inject = ['$window'];

    return ModalContentDirective;
});
