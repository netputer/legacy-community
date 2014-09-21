define(function () {
    // @ngInject
    var RelativeFilter = function () {
        return function (timestamp) {
            var dateTarget = new Date(timestamp);
            var dateCurrent = new Date();

            var textMinute = dateTarget.getMinutes();
            var textHour = dateTarget.getHours();

            if (textMinute < 10) {
                textMinute = '0' + dateTarget.getMinutes();
            }

            if (textHour < 10) {
                textHour = '0' + dateTarget.getHours();
            }

            var textTime = textHour + ':' + textMinute;
            var textDate = dateTarget.getMonth() + '月' + dateTarget.getDate() + '日';
            var textYear = dateTarget.getFullYear() + '年';

            var seconds = Math.floor((dateCurrent - dateTarget) / 1000);

            if (seconds === 0) {
                return '刚刚';
            }

            if (seconds < 5) {
                return ' ' + seconds + ' 秒前';
            }

            if (seconds < 10) {
                return ' 5 秒前';
            }

            if (seconds < 60) {
                return ' ' + Math.floor(seconds / 10) * 10 + ' 秒前';
            }

            if (seconds < 3600) {
                return ' ' + Math.floor(seconds / 60) + ' 分钟前';
            }

            if (seconds < 60 * 70) {
                return ' 1 小时前';
            }

            if (dateTarget.getFullYear() === dateCurrent.getFullYear()) {
                if (dateTarget.getMonth() === dateCurrent.getMonth() &&
                        dateCurrent.getDate() - dateTarget.getDate() < 2) {
                    if (dateCurrent.getDate() - dateTarget.getDate() === 0) {
                        return '今天 ' + textTime;
                    }

                    return '昨天 ' + textTime;
                    // @TODO 0331-0401 也要显示昨天
                }

                return ' ' + textDate + ' ' + textTime;
            }

            return ' ' + textYear + textDate + ' ' + textTime;
        };
    };

    return RelativeFilter;
});
