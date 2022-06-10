class IbpAgGrid {
    gridOptions;
    getDataUrl;
    delUrl;
    isReady = false;
    targetId = '#page-content';
    agName;

    constructor(gridOptions, getDataUrl, delUrl, agName) {
        this.gridOptions = gridOptions;
        this.getDataUrl = getDataUrl;
        this.delUrl = delUrl;
        this.agName = agName;
        this.renderAgGrid();
    }

    renderAgGrid() {
        this.prepareHtml();
        new agGrid.Grid(document.querySelector(this.targetId), this.gridOptions);
        this.setGridData(getData(this.getDataUrl));
        this.setGridCloseObserver();
        this.setDeleteButtonAction();

        actionMenu.hideOneRowAction();
        actionMenu.returnToOuter.style.display = 'none';
        actionMenu.newTableRow.style.display = 'block';
        actionMenu.listLocationsButton.style.display = 'block';

        this.isReady = true;
    }


    setGridData(data) {
        if (data === null) {
            throw 'setGridData data is null';
        }
        this.gridOptions.api.setRowData(Object.values(data));
    }

    refreshData() {
        this.setGridData(getData(this.getDataUrl));
    }

    getSelectedRow() {
        let selectedRows = this.gridOptions.api.getSelectedRows()
        if (selectedRows.length > 0) {
            return selectedRows[0];
        }
    }

    setDeleteButtonAction() {
        let successDelete = () => {
            this.refreshData();
        }
        // actionMenu.deleteTableRow.off('click');
        actionMenu.deleteTableRow.onclick = () => {
            let selectedRow = this.getSelectedRow();
            deleteById(selectedRow.id, successDelete, this.delUrl);
            actionMenu.hideOneRowAction();
            actionMenu.showInner.style.display = 'none';
        };
    }

    setGridCloseObserver() {
        const observer = new MutationObserver(function (mutations_list) {
            //if another one mutation observer has been started
            if (mutations_list.length > 1) {
                observer.disconnect();
                return;
            }
            mutations_list.forEach(node => {
                if (node.removedNodes.length > 0) {
                    actionMenu.hideALl();
                    observer.disconnect();
                }
            })
        });
        observer.observe(document.querySelector(this.targetId), {subtree: false, childList: true});
    }

    prepareHtml() {
        $(this.targetId).html("");
        $(this.targetId).css({'width': '100%'}).addClass('ag-theme-alpine');
    }
}


var innerEquipParameters = {
    gridOptions: {
        domLayout: 'autoHeight',
        suppressRowTransform: true,

        columnDefs: [
            {headerName: "Элемент", field: "inner_name", minWidth: 250, tooltipField: 'inner_name'},
            {headerName: "ЗавНомЭлемента", field: "faсtory_number_inner", tooltipField: 'faсtory_number_inner'},
            {headerName: "Количество", field: "quant", tooltipField: 'quant'},
            {headerName: "ЗИП", field: "state_zip", tooltipField: 'state_zip'},
            {headerName: "ТехнСост", field: "state_tech_condition", tooltipField: 'state_tech_condition'},
            {headerName: "Назначение", field: "purpose", tooltipField: 'purpose'},
            {headerName: "ИнвНом", field: "inventory_number", tooltipField: 'inventory_number'},
            {headerName: "Выпуск", field: "year_issue", tooltipField: 'year_issue'},
            {headerName: "НачЭксплуат", field: "year_exploitation", tooltipField: 'year_exploitation'},
            {headerName: "Напряжение", field: "voltage", tooltipField: 'voltage'},
            {headerName: "ВидТО", field: "tehn_obsl_hours", tooltipField: 'tehn_obsl_hours'},
            {headerName: "СтартТО", field: "tehn_obsl_start", tooltipField: 'tehn_obsl_start'},
            {headerName: "Приоритет", field: "state_priority", tooltipField: 'state_priority'},
            {headerName: "Зявка", field: "state_request", tooltipField: 'state_request'},
            {headerName: "ЗявкаПодтвержд", field: "state_approved_request", tooltipField: 'state_approved_request'},
            {headerName: "ДатаПоломки", field: "fault_date", tooltipField: 'fault_date'},
            {headerName: "ПричинаПоломки", field: "fault_reason", tooltipField: 'fault_reason'},
            {headerName: "ДатаДоставки", field: "state_delivery_date", tooltipField: 'state_delivery_date'}
        ],
        rowSelection: 'single',
        defaultColDef: {
            resizable: true,
            editable: true,
        },
        enableBrowserTooltips: true,
        onCellValueChanged: function (event) {
            setRowById(event.data.id, event.data, config.api.setInnerEquipmentRowById);
        },
        onRowSelected: function () {
            actionMenu.deleteTableRow.style.display = 'block';
        },
        onFirstDataRendered: (params) => {
            params.api.sizeColumnsToFit();
        }
    },
    agName: 'innerEquip'
}

var buildingAndOuterEquipParameters = {
    gridOptions: {
        domLayout: 'autoHeight',
        columnDefs: [
            {headerName: "Место", field: "place_third_lev", tooltipField: 'place_third_lev'},
            {headerName: "Имя", field: "equip_name", minWidth: 250, tooltipField: 'equip_name'},
            {headerName: "Номер", field: "factory_number", tooltipField: 'factory_number'},
            {headerName: "Производитель", field: "factory_name", tooltipField: 'factory_name'},
            {headerName: "ИнвНом", field: "inventory_number", tooltipField: 'inventory_number'},
            {headerName: "НомВвода", field: "numb_vvod"},
            {headerName: "Назначение", field: "purpose", tooltipField: 'purpose'},
            {headerName: "Выпуск", field: "year_issue", tooltipField: 'year_issue'},
            {headerName: "Эксплуатация", field: "year_exploitation", tooltipField: 'year_exploitation'},
            {headerName: "Мощность", field: "power", tooltipField: 'power'},
            {headerName: "Ток", field: "current"},
            {headerName: "Состояние", field: "state_tech_condition", tooltipField: 'state_tech_condition'}
        ],
        rowSelection: 'single',
        defaultColDef: {
            resizable: true,
            editable: true,
        },
        enableBrowserTooltips: true,
        onCellValueChanged: function (event) {
            setRowById(event.data.id, event.data, config.api.setOuterEquipmentRowById);
        },
        onRowSelected: function () {
            actionMenu.showOneRowAction();
        },
        onFirstDataRendered: (params) => {
            params.api.sizeColumnsToFit();
        }
    },
    agName: 'buildingAndOuterEquip'
}


