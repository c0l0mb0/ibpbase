import {config} from "./cps-portal-dao.js";
import {httpRequest} from "./cps-portal-dao.js";
import {addCSRF} from "./helper.js";

export default class ActionMenu {
    tableAgGrid;
    modalForm;
    newTableRow;
    deleteTableRow;
    deleteAction;
    exportExcel;
    fireExamPlusSix;

    hideALl() {
        this.newTableRow.style.display = 'none';
        this.deleteTableRow.style.display = 'none';
        this.exportExcel.style.display = 'none';
        this.fireExamPlusSix.style.display = 'none';
    }

    showOneRowAction() {
        this.deleteTableRow.style.display = 'block';
    }

    showPlusSixMonthButton() {
        this.fireExamPlusSix.style.display = 'block';
    }

    setRowActionForNotEditableGrid() {
        this.newTableRow.style.display = 'none';
    }

    showNewTableRowButton() {
        this.newTableRow.style.display = 'block';
    }

    showExcelExportButton() {
        this.exportExcel.style.display = 'block';
    }

    hideOneRowAction() {
        this.deleteTableRow.style.display = 'none';
    }

    setExportExcelAction() {
        this.exportExcel.onclick = () => {
            this.tableAgGrid.exportDisplyedDataToExcel();
        };
    }

    setFireExamPlusSixAction() {
        this.fireExamPlusSix.onclick = () => {
            let selectedRow = this.tableAgGrid.getSelectedRow();
            console.log(selectedRow);
            httpRequest(config.api.postWorkersAddSixMonth, "POST", addCSRF(selectedRow)).then(() => {
                this.tableAgGrid.setGridData();
            }).catch((rejected) => console.log(rejected));
        }
    }
}


