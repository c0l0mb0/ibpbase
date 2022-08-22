import ActionMenu from './action-menu.js'
import * as equipment_dao from './equipment-dao.js'
import SideBar from './side-bar.js'
import ModalForm from './modal.js'

let actionMenu = new ActionMenu();
let modalForm = new ModalForm();
let sideBar = new SideBar();

//set links to each other
modalForm.actionMenu = actionMenu;

actionMenu.modalForm = modalForm;

sideBar.actionMenu = actionMenu;
sideBar.modalForm = modalForm;
sideBar.setButtonsActions();


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
actionMenu.listLocationsUrl = equipment_dao.config.api.getListLocations;
actionMenu.hideALl();

document.getElementById('dropdownMenuView').style.display = 'none';








