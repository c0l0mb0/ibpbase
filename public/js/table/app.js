let ibpAgGrid;
let actionMenu = new ActionMenu();

let agOuterId

actionMenu.newTableRow = document.getElementsByClassName('new-table-row')[0];
actionMenu.deleteTableRow = document.getElementsByClassName('delete-table-row')[0];
actionMenu.showInner = document.getElementsByClassName('show-inner')[0];
actionMenu.returnToOuter = document.getElementsByClassName('show-last-outer')[0];
actionMenu.listLocationsButton = document.getElementById('dropdown-menu-button-locations');
actionMenu.listLocationUl = document.getElementById('action-menu-dropdown-locations');
actionMenu.listLocationsUrl = config.api.getListLocations;
actionMenu.hideALl();

document.getElementsByClassName('all-equip')[0].style.display = 'none';
document.getElementsByClassName('edit-elements')[0].style.display = 'none';
document.getElementById('dropdownMenuView').style.display = 'none';


function changePageTitle(page_title) {
    document.getElementById('page-title').textContent = page_title;
    // $('#page-title').text(page_title);
    document.title = page_title;
}






