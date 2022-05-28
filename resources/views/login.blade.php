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
    <link rel="stylesheet" href="{{ asset('css/login/login.css') }}">

</head>
<body>
<div class="wrapper fadeInDown">
    <div id="formContent">
        <!-- Icon -->
        <div class="fadeIn first">
            <div class="icon">
                <img src="{{ asset('icon/key.svg') }}" id="icon" alt="User Icon"/>
            </div>
        </div>
        <!-- Login Form -->
        <form id="form" method="POST" action="{{ route('user.login') }}">
            @csrf
            <input type="text" id="login" class="fadeIn second" name="user_name" placeholder="Логин">
            @error('user_name')
            <div class="alert alert-danger">{{ $message }}</div>
            @enderror
            <input type="text" id="password" class="fadeIn third" name="password" placeholder="Пароль">
            @error('password')
            <div class="alert alert-danger">{{ $message }}</div>
            @enderror
            <input type="submit" class="fadeIn fourth " id="submitBtn" value=Войти>
            @error('common_error')
            <div class="alert alert-danger">{{ $message }}</div>
            @enderror
        </form>
    </div>
</div>
<script src="{{ asset('js/bootstrap.min.js') }}"></script>
{{--<script src="{{ asset('js/jquery.min.js') }}"></script>--}}
{{--<script src="{{ asset('js/login/login.js') }}"></script>--}}
</body>
</html>
