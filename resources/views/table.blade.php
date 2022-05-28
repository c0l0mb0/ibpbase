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
    <link rel="stylesheet" href="{{ asset('css/table.css') }}">

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
                    <a class="all-equip" href="#">Состояние</a>
                </li>
                <li>
                    <a class="edit_equip" href="#">Приборы</a>
                </li>
                <li>
                    <a class="edit-elements" href="#">Элементы</a>
                </li>
                <li>
                    <a href="#">Капремонт</a>
                </li>
                <li>
                    <a href="#">ТОиР</a>
                </li>
                <li>
                    <a href="#">ПЭН/РЭН АКБ</a>
                </li>
                <li>
                    <a href="#">Акты ТРО</a>
                </li>
                <li>
                    <a href="#">График ТО</a>
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
                            data-bs-placement="bottom" title="Добавить" data-bs-target="#modal-new-inner-equip">
                        <img src="src/icon/plus-svgrepo-com.svg" class="row-menue__icon">
                    </button>
                    <button type="button" class="btn show-inner" data-bs-toggle="tooltip" data-bs-placement="bottom"
                            title="Элементы">
                        <img src="src/icon/arrow-return-left.svg" class="row-menue__icon">
                    </button>
                    <button type="button" class="btn delete-table-row" data-bs-toggle="tooltip"
                            data-bs-placement="bottom" title="Удалить">
                        <img src="src/icon/trash.svg" class="row-menue__icon">
                    </button>
                    <div class="dropdown">
                        <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1"
                                data-bs-toggle="dropdown" aria-expanded="false">
                            Объекты
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuBuildings">
                            <li><a class="dropdown-item" href="#">ГП-1</a></li>
                            <li><a class="dropdown-item" href="#">ГП-2</a></li>
                            <li><a class="dropdown-item" href="#">ГП-3</a></li>
                        </ul>
                    </div>
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
                            <a class="nav-link" href="#">выйти</a>
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
    <div class="modal-container"></div>
</div>
<script src="{{ asset('js/table/ag-grid-community.min.js') }}"></script>
<script src="{{ asset('js/bootstrap.min.js') }}"></script>
<script src="{{ asset('js/jquery.min.js') }}"></script>

<script src="{{ asset('src/js/table/app.js') }}"></script>
<script src="{{ asset('src/js/table/side_bar.js') }}"></script>`
<script src="{{ asset('src/js/table/modal.js') }}"></script>
<script src="{{ asset('src/js/table/action_menu.js') }}"></script>
<script src="{{ asset('src/js/table/equipments_dto.js') }}"></script>
<script src="{{ asset('src/js/table/aggrid.js') }}"></script>
</body>
</html>
