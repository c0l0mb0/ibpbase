var app = (function ($) {

    var ui = {
        login: {
            $form: $('#form'),
            $error: $('#error')
        }
    };

    var config = {
        api: {
            login: 'http://ibp/api/public/index.php/api/v1/login'
        }
    };

    function _showError(message) {
        ui.login.$error.text(message);
        ui.login.$error.removeClass('d-none');
    }

    function _hideError() {
        ui.login.$error.addClass('d-none');
    }

    function _login(e) {
        e.preventDefault();
        _hideError();
        $.ajax({
            url: config.api.login,
            method: 'POST',
            data: ui.login.$form.serialize(),
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            success: function () {
                window.location.replace("http://ibp/front/index.html");
            },
            error: function (response) {
                _showError("Ошибка, попробуйте еще раз");
            }
        });
    }

    function init() {
        ui.login.$form.submit(_login);
        ui.login.$form.find('input').on('keydown', _hideError);
    }

    return {
        init: init
    }
})(jQuery);

jQuery(document).ready(app.init);