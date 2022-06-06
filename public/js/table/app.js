let ibpAgGrid;
let actionMenu = new ActionMenu();
let agOuterId
let agLocationFilterId
let agLocationFilterText

actionMenu.newTableRow = $('.new-table-row');
actionMenu.deleteTableRow = $('.delete-table-row');
actionMenu.showInner = $('.show-inner');
actionMenu.showLastOuter = $('.show-last-outer');
actionMenu.listLocationsButton = $('#dropdown-menu-button-locations');
actionMenu.listLocationUl= document.getElementById('action-menu-dropdown-locations');
actionMenu.listLocationsUrl = config.api.getListLocations;
actionMenu.hideALl();


$('.all-equip').hide();
$('.edit-elements').hide();
$('#dropdownMenuView').hide();


function changePageTitle(page_title) {

    $('#page-title').text(page_title);

    document.title = page_title;
}






