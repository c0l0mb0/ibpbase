class ActionMenu {
    newTableRow;
    deleteTableRow;
    exportExcel;

    hideALl() {
        this.newTableRow.style.display = 'none';
        this.deleteTableRow.style.display = 'none';
        this.exportExcel.style.display = 'none';
    }

    showOneRowAction() {
        this.deleteTableRow.style.display = 'block';
    }

    setRowActionForNotEditableGrid() {
        actionMenu.newTableRow.style.display = 'none';
    }

    hideOneRowAction() {
        this.deleteTableRow.style.display = 'none';
    }

    ////Excel export action////
    setExportExcelAction() {
        this.exportExcel.onclick = () => {
            ibpAgGrid.exportDisplyedDataToExcel();
        };
    }
}


