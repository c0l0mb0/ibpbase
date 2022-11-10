import TableAgGrid from './aggrid.js'
import {config} from './cps-portal-dao.js'
import {changePageTitle} from './helper.js'
import {agGridParameters} from './ag-grid-parameters.js'

export default class SideBar {
    tableAgGrid;
    actionMenu;
    modalForm;

    setButtonsActions() {

        document.getElementById('sidebarCollapse').onclick = () => {
            document.getElementById('sidebar').classList.toggle("active");
        };

        document.querySelector('.sidebar__edit-staff').onclick = () => {
            this.tableAgGrid = new TableAgGrid(agGridParameters.workersParameters.gridOptions,
                config.api.getWorkersALl, config.api.postPutDeleteWorkers,
                agGridParameters.workersParameters.agName, this.actionMenu);
            this.actionMenu.tableAgGrid = this.tableAgGrid
            this.modalForm.tableAgGrid = this.tableAgGrid;
            this.actionMenu.hideALl();
            this.modalForm.setModalWorkersFormHtml();
            this.actionMenu.showNewTableRowButton();
            this.actionMenu.showExcelExportButton();
            changePageTitle("Работники");
        };

        document.querySelector('.sidebar__edit-fire_instr').onclick = () => {
            this.tableAgGrid = new TableAgGrid(agGridParameters.fireInstrParameters.gridOptions,
                config.api.getWorkersALl, config.api.postPutDeleteWorkers,
                agGridParameters.fireInstrParameters.agName, this.actionMenu);
            this.actionMenu.tableAgGrid = this.tableAgGrid
            this.modalForm.tableAgGrid = this.tableAgGrid;
            this.actionMenu.hideALl();
            this.actionMenu.setRowActionForNotEditableGrid();
            this.actionMenu.hideOneRowAction();
            this.actionMenu.showExcelExportButton();
            this.actionMenu.setFireExamPlusSixAction();

            changePageTitle("Пожинструктаж");
        };
    }
}





