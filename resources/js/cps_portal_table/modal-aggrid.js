import {httpRequest} from "./cps-portal-dao";

export default class ModalAggrid {
    gridOptions;
    getDataUrl;
    agName;
    targetId = 'modal-aggrid';
    constructor(gridOptions, getDataUrl, agName) {
        this.gridOptions = gridOptions;
        this.getDataUrl = getDataUrl;
        this.agName = agName;
        this.renderAgGrid();
    }
    renderAgGrid() {
        this.prepareHtml();
        new agGrid.Grid(document.getElementById(this.targetId), this.gridOptions);
        this.setGridData();
    }
    prepareHtml() {
        let pageContentHtml = document.getElementById(this.targetId);
        pageContentHtml.innerHTML = "";
        pageContentHtml.style.width = '100%'
        pageContentHtml.classList.add('ag-theme-alpine');
    }
    setGridData() {
        httpRequest(this.getDataUrl, 'GET').then((data) => {
            if (data === null) {
                throw 'setGridData data is null';
            }
            this.gridOptions.api.setRowData(data);
        });
    }

}

