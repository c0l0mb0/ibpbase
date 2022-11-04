import ActionMenu from './action-menu.js'
import SideBar from './side-bar.js'
import ModalForm from './modal.js'
import {httpRequest} from "./equipment-dao.js";
import {config} from './equipment-dao.js'
import {agGridParameters} from "./aggrid.js";

let actionMenu = new ActionMenu();
let modalForm = new ModalForm();
let sideBar = new SideBar();


let arrLocationFirstLev = {};
let arrOnlyLocationFirstLev = [];

httpRequest(config.api.getListLocations, 'GET').then((data) => {
    arrLocationFirstLev = data;
    for (let i = 0; i < arrLocationFirstLev.length; i++) {
        arrOnlyLocationFirstLev.push(arrLocationFirstLev[i]["location"])
    }

    modalForm.arrLocationFirstLev = arrLocationFirstLev;
    actionMenu.arrLocationFirstLev = arrLocationFirstLev;
    sideBar.arrLocationFirstLev = arrLocationFirstLev;
    agGridParameters.buildingAndOuterEquipParameters.gridOptions.columnDefs[0].cellEditorParams.values = arrOnlyLocationFirstLev;
}).catch((err) => console.log(err));


//set objects links to each other
modalForm.actionMenu = actionMenu;

actionMenu.modalForm = modalForm;

sideBar.actionMenu = actionMenu;
sideBar.modalForm = modalForm;
sideBar.setButtonsActions();

//assign links to buttons
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
