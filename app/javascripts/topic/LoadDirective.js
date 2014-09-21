define(function () {
    // @ngInject
    var LoadDirective = function ($parse) {
        return {
            restrict: 'A',
            compile: function ($element, $attrs) {
                // @TODO: use link to bind elem
                var fn = $parse($attrs.cmtyLoad);

                return function (scope, element) {
                    element.on('load', function (event) {
                        scope.$apply(function () {
                            fn(scope, {
                                $event: event
                            });
                        });
                    });
                };
            }
        };
    };

    return LoadDirective;
});
