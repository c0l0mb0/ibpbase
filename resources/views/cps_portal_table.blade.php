<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    {{--    CSRF Token--}}
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Вход</title>

    <link rel="stylesheet" href="{{ asset('css/libs/bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/table/table.css') }}">
    <link rel="stylesheet" href="{{ asset('css/libs/flatpickr.min.css') }}">

</head>
<body>
<div class="wrapper">
    <!-- Sidebar  -->
    <nav id="sidebar" class="sticky-sm-top">
        <div class="sidebar-container">
            <div class="sidebar-header">
                <div class="sidebar__icon">
                    <img src="{{ asset('icon/sensor.png') }}" alt="" aria-hidden="true">
                </div>
            </div>
            <ul class="list-unstyled components">
                <li>
                    <a class="sidebar-edit_equip" href="#">Обрудование</a>
                </li>
                <li>
                    <a class="sidebar__show-kap-remont" href="#">ЗИП</a>
                </li>
                <li>
                    <a class="sidebar__show-tehn-obsl-remont" href="#">ПожИнструктаж</a>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Page Content  -->
    <div id="content">

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid navbar-container">

                <button type="button" id="sidebarCollapse" class="btn btn-info">
                    <i class="fas fa-align-left"></i>
                    <span>Меню</span>
                </button>
                <div class="row-menue">
                    <button type="button" class="btn new-table-row action-menu-btn" data-toggle="modal"
                            title="Добавить" data-target="#modal__new-entry">
                        <img src="{{ asset('icon/plus-svgrepo-com.svg') }}" class="row-menue__icon">
                    </button>
                    <button type="button" class="btn delete-table-row action-menu-btn" data-bs-toggle="tooltip"
                            data-bs-placement="bottom" title="Удалить">
                        <img src="{{ asset('icon/trash.svg') }}" class="row-menue__icon">
                    </button>
                </div>
                <div class="justify-content-end navbar-btn-logout-wrapper">
                    <button type="button" class="btn logout action-menu-btn" data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title="Выйти">выйти
                    </button>
                </div>
            </div>
        </nav>
        <div id="app" class="scroll">
            <div class='app-container'>
                <div class='page-header'>
                    <h1 id='page-title'></h1>
                </div>
                <div id='page-content'></div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal-container">
        <div class="modal fade" id="modal__new-entry" tabindex="-1" aria-labelledby="modal-Label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal__caption">Добавить</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form class="modal-form needs-validation" id="form__new-entry">
                        <div class="modal__form__body"></div>
                        <div class="row" style="margin: 0;">
                            <mark id="form__error" class="inline-block secondary d-none" style="text-align: center">
                            </mark>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                            <button type="submit" class="btn btn-primary modal__sbmit">Сохранить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>


<script src="{{ asset('js/libs/ag-grid-community-ie11.min.js') }}"></script>

<script src="{{ asset('js/libs/flatpickr.js') }}"></script>
<script src="{{ asset('js/libs/ru.js') }}"></script>

<script src="{{ asset('js/libs/jquery-3.2.1.slim.min.js') }}"></script>
<script src="{{ asset('js/libs/popper.min.js') }}"></script>
<script src="{{ asset('js/libs/bootstrap4.min.js') }}"></script>


<script src="{{ asset('js/ibp_table/cps_portal.js') }}"></script>

</body>
</html>
