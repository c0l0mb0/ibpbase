let ibpAgGrid;
let actionMenu = new ActionMenu();
let agOuterId

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






