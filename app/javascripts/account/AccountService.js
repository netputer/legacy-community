define([
    'wdjAccount'
], function (
    account
) {
    // @ngInject
    var AccountServices = function ($q) {
        var userDeferred = $q.defer();
        $q.when(account.checkAsync()).then(userDeferred.resolve);

        return {
            getUser: function () {
                return userDeferred.promise;
            },
            open: function (name, options) {
                return $q.when(account.openAsync(name, options));
            }
        };
    };

    return AccountServices;
});
