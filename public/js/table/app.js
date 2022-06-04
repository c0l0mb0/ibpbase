let actionMenu = new ActionMenu();
actionMenu.newTableRow = $('.new-table-row');
actionMenu.deleteTableRow = $('.delete-table-row');
actionMenu.showInner = $('.show-inner');
actionMenu.showLastOuter = $('.show-last-outer');
actionMenu.listLocationsButton = $('#dropdown-menu-button-locations');
actionMenu.listLocationUl= $("#action-menu-dropdown-locations");
actionMenu.listLocationsUrl = config.api.getListLocations;
actionMenu.createOuterEquipLocationList();
actionMenu.hideALl();

let ibpAgGrid;

$('.all-equip').hide();
$('.edit-elements').hide();
$('#dropdownMenuView').hide();


function changePageTitle(page_title) {

    $('#page-title').text(page_title);

    document.title = page_title;
}







