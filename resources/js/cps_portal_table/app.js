import ActionMenu from './action-menu.js'
import SideBar from './side-bar.js'
import ModalForm from './modal.js'

let actionMenu = new ActionMenu();
let modalForm = new ModalForm();
let sideBar = new SideBar();

//assign links to buttons
actionMenu.newTableRow = document.querySelector('.new-table-row');
actionMenu.deleteTableRow = document.querySelector('.delete-table-row');

actionMenu.hideALl();
