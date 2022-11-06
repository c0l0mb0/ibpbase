import ActionMenu from './action-menu.js'
import SideBar from './side-bar.js'
import ModalForm from './modal.js'
import {agGridParameters}  from "./ag-grid-parameters.js";

let actionMenu = new ActionMenu();
let modalForm = new ModalForm();
let sideBar = new SideBar();

//set objects links to each other
modalForm.actionMenu = actionMenu;
actionMenu.modalForm = modalForm;
sideBar.actionMenu = actionMenu;
sideBar.modalForm = modalForm;
sideBar.setButtonsActions();

agGridParameters.actionMenu = actionMenu;

//assign links to buttons
actionMenu.newTableRow = document.querySelector('.new-table-row');
actionMenu.deleteTableRow = document.querySelector('.delete-table-row');

actionMenu.hideALl();
