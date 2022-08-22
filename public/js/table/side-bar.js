import * as aggrid from './aggrid.js'
import {config} from './equipment-dao.js'
import {changePageTitle} from './helper.js'


export default class SideBar {
    ibpAgGrid;
    actionMenu;
    modalForm;

    setButtonsActions() {
        aggrid.agGridParameters.actionMenu = this.actionMenu;
        document.getElementById('sidebarCollapse').onclick = () => {
            document.getElementById('sidebar').classList.toggle("active");
        };

        document.querySelector('.sidebar-edit_equip').onclick = () => {
            this.ibpAgGrid = new aggrid.IbpAgGrid(aggrid.agGridParameters.buildingAndOuterEquipParameters.gridOptions,
                config.api.getDataBuildingAndOuter, config.api.deleteOuterEquipAndItsLocation,
                aggrid.agGridParameters.buildingAndOuterEquipParameters.agName, this.actionMenu);
            this.actionMenu.ibpAgGrid = this.ibpAgGrid
            this.modalForm.ibpAgGrid = this.ibpAgGrid;
            this.modalForm.setModalOuterFormHtml();

            this.actionMenu.setEditInnerAction();
            this.actionMenu.setEditKapRemontAction();
            this.actionMenu.setEditTehnObslRemontAction();
            this.actionMenu.setEditPenRenAction();
            this.actionMenu.setEditTroAction();

            this.actionMenu.createLocationFilter();
            changePageTitle("Приборы");
        };

        document.querySelector('.sidebar-edit_zip').onclick = () => {
            this.ibpAgGrid = new aggrid.IbpAgGrid(aggrid.agGridParameters.zipParameters.gridOptions,
                config.api.getZipEquipmentAll, config.api.getByIdPostPutByIdDeleteByIdZipEquipment,
                aggrid.agGridParameters.zipParameters.agName, this.actionMenu);
            this.actionMenu.ibpAgGrid = this.ibpAgGrid;
            this.modalForm.ibpAgGrid = this.ibpAgGrid;
            this.actionMenu.listLocationsButton.style.display = 'none';
            this.modalForm.setModalZipFormHtml()
            changePageTitle("ЗИП");
        }
        document.querySelector('.sidebar__show-kap-remont').onclick = () => {

            this.ibpAgGrid = new aggrid.IbpAgGrid(aggrid.agGridParameters.buildingOuterEquipKapRemontParameters.gridOptions,
                config.api.getKapRemontOuterEquipAll, null,
                aggrid.agGridParameters.buildingOuterEquipKapRemontParameters.agName, this.actionMenu);
            this.actionMenu.ibpAgGrid = this.ibpAgGrid;
            this.modalForm.ibpAgGrid = this.ibpAgGrid;
            this.actionMenu.setRowActionForNotEditableGrid();
            changePageTitle("Капремонт");
        }
        document.querySelector('.sidebar__show-tehn-obsl-remont').onclick = () => {
            this.ibpAgGrid = new aggrid.IbpAgGrid(aggrid.agGridParameters.buildingOuterEquipTehnObslRemontParameters.gridOptions,
                config.api.getTehnObslRemontOuterEquipAll, null,
                aggrid.agGridParameters.buildingOuterEquipTehnObslRemontParameters.agName, this.actionMenu);
            this.actionMenu.ibpAgGrid = this.ibpAgGrid;
            this.modalForm.ibpAgGrid = this.ibpAgGrid;
            this.actionMenu.setRowActionForNotEditableGrid();
            changePageTitle("ТОиР");
        }
        document.querySelector('.sidebar__show-pen-ren').onclick = () => {
            this.ibpAgGrid = new aggrid.IbpAgGrid(aggrid.agGridParameters.buildingOuterEquipPenRenParameters.gridOptions,
                config.api.getPenRenOuterEquipAll, null,
                aggrid.agGridParameters.buildingOuterEquipPenRenParameters.agName, this.actionMenu);
            this.actionMenu.ibpAgGrid = this.ibpAgGrid;
            this.modalForm.ibpAgGrid = this.ibpAgGrid;
            this.actionMenu.setRowActionForNotEditableGrid();
            changePageTitle("ПЭН/РЭН АКБ");
        }
        document.querySelector('.sidebar__show-tro').onclick = () => {
            this.ibpAgGrid = new aggrid.IbpAgGrid(aggrid.agGridParameters.buildingOuterEquipTroParameters.gridOptions,
                config.api.getTroOuterEquipAll, null,
                aggrid.agGridParameters.buildingOuterEquipTroParameters.agName, this.actionMenu);
            this.actionMenu.ibpAgGrid = this.ibpAgGrid;
            this.modalForm.ibpAgGrid = this.ibpAgGrid;
            this.actionMenu.setRowActionForNotEditableGrid();
            changePageTitle("Акты ТРО");
        }
    }
}





