define(function () {
    var HttpInterceptor = function ($q) {
        return {
            request: function (config) {
                config.params = config.params || {};
                config.params.f = 'web';

                return config;
            },
            response: function (response) {
                return response;
            },
            requestError: function (rejection) {
                return $q.reject(rejection);
            },
            responseError: function (rejection) {
                return $q.reject(rejection);
            }
        };
    };

    return HttpInterceptor;
});
