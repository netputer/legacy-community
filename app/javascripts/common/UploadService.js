define([
    'jquery',
    'fileupload'
], function (
    $
) {
    var UploadService = function () {
        var $uploader = $('<input type="file">').fileupload({
            url: 'http://group.wandoujia.com/api/v1/file/image',
            dataType: 'json',
            sequentialUploads: true
        });

        return {
            upload: function (options) {
                options = options || {};

                $uploader.fileupload('option', {
                    submit: options.before,
                    progress: options.progress,
                    done: options.done,
                    fail: options.fail
                });

                $uploader.fileupload('add', {
                    fileInput: options.$file
                });
            }
        };
    };

    return UploadService;
});
