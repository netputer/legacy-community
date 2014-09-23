define(function () {
    // @ngInject
    var AccountController = function ($scope, $window, $location, AccountService, GroupService, $timeout) {
        var scope = this;
        scope.isLoggedIn = false;
        scope.hasUnread = false;

        scope.gotoHome = function () {
            $location.path('/');
        };

        scope.showNotifications = function () {
            $timeout(function () {
                $location.path('/notification');
                scope.hasUnread = false;
            });
        };

        var sdkCallback = function () {
            $window.location.reload();
        };

        scope.showRegister = function () {
            AccountService.open('register').then(sdkCallback);
        };

        scope.showLogin = function () {
            AccountService.open('login').then(sdkCallback);
        };

        scope.showLogout = function () {
            AccountService.open('logout').then(sdkCallback);
        };

        var anchor = $('<a>').attr('target', '_blank');

        scope.gotoUser = function () {
            anchor.attr('href', 'http://www.wandoujia.com/user/');
            anchor[0].click();
        };

        scope.gotoSettings = function () {
            anchor.attr('href', 'http://www.wandoujia.com/account/settings.html');
            anchor[0].click();
        };

        var getUnreadNotificationsCount = function () {
            GroupService.getUnreadNotificationsCount().then(function (xhr) {
                scope.hasUnread = xhr.data.code === 0 && xhr.data.msg !== '0';
            });

            $timeout(getUnreadNotificationsCount, 30000);
        };

        AccountService.getUser().then(function (user) {
            scope.isLoggedIn = user.isLoggedIn;
            scope.user = user.data;

            getUnreadNotificationsCount();
        });

        scope.isLoggedIn = AccountService.isLoggedIn;
        scope.user = AccountService.user;
    };

    return AccountController;
});
