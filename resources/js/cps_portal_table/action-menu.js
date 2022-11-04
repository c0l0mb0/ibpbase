export default class ActionMenu {
    AgGridTbale;
    modalForm;
    newTableRow;
    deleteTableRow;
    deleteAction;

    hideALl() {
        this.newTableRow.style.display = 'none';
        this.deleteTableRow.style.display = 'none';
    }

    showOneRowAction() {
        this.deleteTableRow.style.display = 'block';
    }

    setRowActionForNotEditableGrid() {
        this.newTableRow.style.display = 'none';
    }

    hideOneRowAction() {
        this.deleteTableRow.style.display = 'none';
    }
}


