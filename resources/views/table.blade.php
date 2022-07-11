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
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/table/table.css') }}">
    <link rel="stylesheet" href="{{ asset('css/table/flatpickr.min.css') }}">

</head>
<body>
<div class="wrapper">
    <!-- Sidebar  -->
    <nav id="sidebar" class="sticky-sm-top">
        <div class="sidebar-container">
            <div class="sidebar-header">
                <h3>База ИБП</h3>
            </div>
            <ul class="list-unstyled components">
                <li>
                    <a class="sidebar-edit_equip" href="#">Приборы</a>
                </li>
                <li>
                    <a class="sidebar__show-kap-remont" href="#">Капремонт</a>
                </li>
                <li>
                    <a class="sidebar__show-tehn-obsl-remont" href="#">ТОиР</a>
                </li>
                <li>
                    <a class="sidebar__show-pen-ren" href="#">ПЭН/РЭН АКБ</a>
                </li>
                <li>
                    <a class="sidebar__show-tro" href="#">Акты ТРО</a>
                </li>
                <li>
                    <a href="#">График ТО</a>
                </li>
                <li>
                    <a class="sidebar-edit_zip" href="#">ЗИП</a>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Page Content  -->
    <div id="content">

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">

                <button type="button" id="sidebarCollapse" class="btn btn-info">
                    <i class="fas fa-align-left"></i>
                    <span>Меню</span>
                </button>
                <div class="row-menue">
                    <button type="button" class="btn new-table-row" data-bs-toggle="modal" data-bs-trigger="hover"
                            data-bs-placement="bottom" title="Добавить" data-bs-target="#modal__new-entry">
                        <img src="{{ asset('icon/plus-svgrepo-com.svg') }}" class="row-menue__icon">
                    </button>
                    <button type="button" class="btn show-last-outer" data-bs-toggle="tooltip" data-bs-placement="bottom"
                            title="Оборудование">
                        <img src="{{ asset('icon/outer.svg') }}" class="row-menue__icon">
                    </button>
                    <button type="button" class="btn delete-table-row" data-bs-toggle="tooltip"
                            data-bs-placement="bottom" title="Удалить">
                        <img src="{{ asset('icon/trash.svg') }}" class="row-menue__icon">
                    </button>
                    <div class="dropdown">
                        <button class="btn dropdown-toggle" type="button" id="dropdown-menu-button-locations"
                                data-bs-toggle="dropdown" aria-expanded="false">
                            Объекты
                        </button>
                        <ul class="dropdown-menu" id="action-menu-dropdown-locations" aria-labelledby="dropdownMenuBuildings"></ul>
                    </div>
                    <button type="button" class="btn show-inner" data-bs-toggle="tooltip" data-bs-placement="bottom"
                            title="Элементы">
                        <img src="{{ asset('icon/chip-svgrepo-com.svg') }}" class="row-menue__icon">
                    </button>
                    <button type="button" class="btn show-cap-remont" data-bs-toggle="tooltip"
                            data-bs-placement="bottom" title="Кап. ремонт">
                        <img src="{{ asset('icon/wrench-adjustable-circle.svg') }}" class="row-menue__icon">
                    </button>
                    <button type="button" class="btn show-toir" data-bs-toggle="tooltip"
                            data-bs-placement="bottom" title="ТОиР">
                        <img src="{{ asset('icon/tools.svg') }}" class="row-menue__icon">
                    </button>
                    <button type="button" class="btn show-pen-ren" data-bs-toggle="tooltip"
                            data-bs-placement="bottom" title="ПЭН/РЭН АКБ">
                        <img src="{{ asset('icon/card-list.svg') }}" class="row-menue__icon">
                    </button>
                    <button type="button" class="btn show-tro" data-bs-toggle="tooltip"
                            data-bs-placement="bottom" title="Акт ТРО">
                        <img src="{{ asset('icon/text-indent-left.svg') }}" class="row-menue__icon">
                    </button>
                    <button type="button" class="btn excel-export" data-bs-toggle="tooltip"
                            data-bs-placement="bottom" title="Экспорт в Excel">
                        <img src="{{ asset('icon/excel.svg') }}" class="row-menue__icon">
                    </button>
                    <div class="dropdown">
                        <button class="btn dropdown-toggle" type="button" id="dropdownMenuView"
                                data-bs-toggle="dropdown" aria-expanded="false">
                            Вид
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#">Локация</a></li>
                            <li><a class="dropdown-item" href="#">Параметры</a></li>
                            <li><a class="dropdown-item" href="#">Все поля</a></li>
                        </ul>
                    </div>
                </div>
                <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fas fa-align-justify"></i>
                </button>

                <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul class="nav navbar-nav ml-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="/logout">выйти</a>
                        </li>
                    </ul>
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
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form class="modal-form needs-validation" id="form__new-entry">
                        <div class="modal__form__body"></div>
                        <div class="row" style="margin: 0;">
                            <mark id="form__error" class="inline-block secondary d-none" style="text-align: center">
                            </mark>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                            <button type="submit" class="btn btn-primary modal__sbmit">Сохранить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>


<script src="{{ asset('js/table/flatpickr.js') }}"></script>
<script src="{{ asset('js/table/ru.js') }}"></script>
<script src="{{ asset('js/table/date-picker.js') }}"></script>
<script src="{{ asset('js/table/check-box-render.js') }}"></script>
<script src="{{ asset('js/table/ag-grid-community.min.js') }}"></script>
<script src="{{ asset('js/bootstrap.min.js') }}"></script>
<script src="{{ asset('js/table/side-bar.js') }}"></script>
<script src="{{ asset('js/table/modal.js') }}"></script>
<script src="{{ asset('js/table/action-menu.js') }}"></script>
<script src="{{ asset('js/table/equipment-dao.js') }}"></script>
<script src="{{ asset('js/table/aggrid.js') }}"></script>
<script src="{{ asset('js/table/excel-export.js') }}"></script>
<script src="{{ asset('js/table/app.js') }}"></script>
</body>
</html>
