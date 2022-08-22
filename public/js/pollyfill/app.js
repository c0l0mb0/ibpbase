/******/
(function () { // webpackBootstrap
    var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
    !function () {
        /*!****************************************!*\
          !*** ./public/js/table/date-picker.js ***!
          \****************************************/
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {writable: false});
            return Constructor;
        }

        var DatePicker = /*#__PURE__*/function () {
            function DatePicker() {
                _classCallCheck(this, DatePicker);
            }

            _createClass(DatePicker, [{
                key: "init",
                value: function init(params) {
                    flatpickr.localize(flatpickr.l10ns.ru);
                    this.input = document.createElement("input");
                    this.input.value = params.value;
                    this.input.flatpickr();
                }
            }, {
                key: "getGui",
                value: function getGui() {
                    return this.input;
                }
            }, {
                key: "afterGuiAttached",
                value: function afterGuiAttached() {
                    this.input.focus();
                    this.input.select();
                }
            }, {
                key: "getValue",
                value: function getValue() {
                    return this.input.value;
                }
            }, {
                key: "destroy",
                value: function destroy() {
                }
            }, {
                key: "isPopup",
                value: function isPopup() {
                    return false;
                }
            }]);

            return DatePicker;
        }();
    }();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
    !function () {
        /*!********************************!*\
          !*** ./public/js/table/app.js ***!
          \********************************/
        var ibpAgGrid;
        var actionMenu = new ActionMenu();
        var agOuterId;
        actionMenu.newTableRow = document.querySelector('.new-table-row');
        actionMenu.deleteTableRow = document.querySelector('.delete-table-row');
        actionMenu.showInner = document.querySelector('.show-inner');
        actionMenu.returnToOuter = document.querySelector('.show-last-outer');
        actionMenu.listLocationsButton = document.querySelector('#dropdown-menu-button-locations');
        actionMenu.listLocationUl = document.querySelector('#action-menu-dropdown-locations');
        actionMenu.showCapRemont = document.querySelector('.show-cap-remont');
        actionMenu.showToir = document.querySelector('.show-toir');
        actionMenu.showPenRen = document.querySelector('.show-pen-ren');
        actionMenu.showTro = document.querySelector('.show-tro');
        actionMenu.exportExcel = document.querySelector('.excel-export');
        actionMenu.listLocationsUrl = config.api.getListLocations;
        actionMenu.hideALl();
        document.getElementById('dropdownMenuView').style.display = 'none';

        function changePageTitle(page_title) {
            document.getElementById('page-title').textContent = page_title;
            document.title = page_title;
        }

        function addCSRF(objectData) {
            var CSRF = document.getElementsByName('csrf-token')[0].getAttribute('content');

            if (CSRF !== undefined && CSRF !== "") {
                objectData._token = CSRF;
                return objectData;
            }
        }
    }();
    /******/
})()
;
