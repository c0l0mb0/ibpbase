const mix = require('laravel-mix');

require('laravel-mix-polyfill');

// mix.js(['public/js/table/action-menu.js', 'public/js/table/ag-grid-community.min.js',
//     'public/js/table/date-picker.js','public/js/table/check-box-render.js',
//     'public/js/table/aggrid.js', 'public/js/table/equipment-dao.js',
//     'public/js/table/excel-export.js', 'public/js/table/flatpickr.js', 'public/js/table/modal.js',
//     'public/js/table/ru.js', 'public/js/table/side-bar.js','public/js/table/app.js',], 'public/js/pollyfill/app.js')
//     .polyfill({
//         enabled: true,
//         useBuiltIns: "usage",
//         targets: "IE 11"
//     });
mix.js(['public/js/table/date-picker.js','public/js/table/app.js',], 'public/js/pollyfill/app.js')
    .polyfill({
        enabled: true,
        useBuiltIns: "usage",
        targets: "IE 11"
    });
