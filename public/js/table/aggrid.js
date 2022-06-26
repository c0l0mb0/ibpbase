//ag grid wrapper, first field from DAO has to have name id
class IbpAgGrid {
    gridOptions;
    getDataUrl;
    delUrl;
    isReady = false;
    targetId = 'page-content';
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
        new agGrid.Grid(document.getElementById(this.targetId), this.gridOptions);
        this.setGridData();
        this.setGridCloseObserver();
        this.setDeleteButtonAction();

        actionMenu.hideOneRowAction();
        actionMenu.returnToOuter.style.display = 'none';
        actionMenu.newTableRow.style.display = 'block';
        actionMenu.listLocationsButton.style.display = 'block';

        this.isReady = true;
    }

    async setGridData() {
        let data = await httpRequest(this.getDataUrl, 'GET');
        if (data === null) {
            throw 'setGridData data is null';
        }
        this.gridOptions.api.setRowData(data);
    }

    getSelectedRow() {
        let selectedRows = this.gridOptions.api.getSelectedRows()
        if (selectedRows.length > 0) {
            return selectedRows[0];
        }
    }

    setDeleteButtonAction() {
        actionMenu.deleteTableRow.onclick = () => {
            let selectedRow = this.getSelectedRow();
            let csrf = {};
            csrf = addCSRF(csrf);
            httpRequest(this.delUrl, 'DELETE', csrf, selectedRow.id);
            actionMenu.hideOneRowAction();
            actionMenu.showInner.style.display = 'none';
            this.setGridData();
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
        observer.observe(document.getElementById(this.targetId), {subtree: false, childList: true});
    }

    prepareHtml() {
        let pageContentHtml = document.getElementById(this.targetId);
        pageContentHtml.innerHTML = "";
        pageContentHtml.style.width = '100%'
        pageContentHtml.classList.add('ag-theme-alpine');
    }
}

var buildingAndOuterEquipParameters = {
    gridOptions: {
        // components: {
        //     datePicker: getDatePicker(),
        //     checkboxRenderer: CheckboxRenderer
        // },
        domLayout: 'autoHeight',
        columnDefs: [
            {headerName: "Место", field: "place_third_lev", tooltipField: 'place_third_lev'},
            {headerName: "Имя", field: "equip_name", minWidth: 250, tooltipField: 'equip_name'},
            {headerName: "Номер", field: "factory_number", tooltipField: 'factory_number'},
            {headerName: "Производитель", field: "factory_name", tooltipField: 'factory_name'},
            {headerName: "ИнвНом", field: "inventory_number", tooltipField: 'inventory_number'},
            {headerName: "НомВвода", field: "numb_vvod"},
            {headerName: "Назначение", field: "purpose", tooltipField: 'purpose'},
            {headerName: "Выпуск", field: "year_issue", tooltipField: 'year_issue', cellEditor: DatePicker},
            {
                headerName: "Эксплуатация",
                field: "year_exploitation",
                tooltipField: 'year_exploitation',
                cellEditor: DatePicker
            },
            {headerName: "Мощность", field: "power", tooltipField: 'power'},
            {headerName: "Ток", field: "current"},
            {
                headerName: "ЕстьЗИП",
                field: "has_zip",
                cellRenderer: CheckboxRenderer,
            },

            {
                headerName: "Состояние",
                field: "state_tech_condition",
                tooltipField: 'state_tech_condition',
                cellEditor: 'agSelectCellEditor',
                singleClickEdit: true,
                cellEditorParams: {
                    values: ['исправен', 'частично исправен', 'неисправен', 'требуется замена запчастей',
                        'выведен из строя', 'нахоится в резерве', 'теребуется капремонт']
                }
            }
        ],
        rowSelection: 'single',
        defaultColDef: {
            resizable: true,
            editable: true,
        },
        enableBrowserTooltips: true,
        onCellValueChanged: function (event) {
            httpRequest(config.api.setOuterEquipmentRowById, "PUT", addCSRF(event.data), event.data.id);
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

var innerEquipParameters = {
    gridOptions: {
        domLayout: 'autoHeight',
        suppressRowTransform: true,
        columnDefs: [
            {headerName: "Элемент", field: "inner_name", minWidth: 250, tooltipField: 'inner_name'},
            {headerName: "Количество", field: "quant", tooltipField: 'quant'},
            {headerName: "ЗавНомЭлемента", field: "faсtory_number", tooltipField: 'faсtory_number'},
            {headerName: "Производитель", field: "faсtory_name", tooltipField: 'faсtory_name'},
            {headerName: "ИнвНом", field: "inventory_number", tooltipField: 'inventory_number'},
            {headerName: "Назначение", field: "purpose", tooltipField: 'purpose'},
            {headerName: "Выпуск", field: "year_issue", tooltipField: 'year_issue', cellEditor: 'datePicker'},
            {
                headerName: "НачЭксплуат",
                field: "year_exploitation",
                tooltipField: 'year_exploitation',
                cellEditor: 'datePicker'
            },
            {headerName: "Напряжение", field: "voltage", tooltipField: 'voltage'},
            {
                headerName: "ТехнСост",
                field: "state_tech_condition",
                tooltipField: 'state_tech_condition',
                cellEditor: 'agSelectCellEditor',
                singleClickEdit: true,
                cellEditorParams: {
                    values: ['исправен', 'неисправен']
                }
            },
            {headerName: "ДатаПоломки", field: "fault_date", tooltipField: 'fault_date', cellEditor: 'datePicker'},
            {headerName: "ПричинаПоломки", field: "fault_reason", tooltipField: 'fault_reason'},
            {
                headerName: "СтартТО",
                field: "tehn_obsl_start",
                tooltipField: 'tehn_obsl_start',
                cellEditor: 'datePicker'
            },
            {headerName: "ТО4", field: "to_4", tooltipField: 'to_4', cellRenderer: 'checkboxRenderer'},
            {headerName: "ТО5", field: "to_5", tooltipField: 'to_5', cellRenderer: 'checkboxRenderer'},
        ],
        rowSelection: 'single',
        defaultColDef: {
            resizable: true,
            editable: true,
        },
        enableBrowserTooltips: true,
        onCellValueChanged: function (event) {
            httpRequest(config.api.setInnerEquipmentRowById, "PUT", addCSRF(event.data), event.data.id);
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

var zipParameters = {
    gridOptions: {
        domLayout: 'autoHeight',
        suppressRowTransform: true,
        columnDefs: [
            {headerName: "Название", field: "equip_name", minWidth: 250, tooltipField: 'equip_name'},
            {headerName: "Количество", field: "quantity", minWidth: 50, tooltipField: 'quantity'},
        ],
        rowSelection: 'single',
        defaultColDef: {
            resizable: true,
            editable: true,
        },
        enableBrowserTooltips: true,
        onCellValueChanged: function (event) {
            httpRequest(config.api.getByIdPostPutByIdDeleteByIdZipEquipment, "PUT", addCSRF(event.data), event.data.id);
        },
        onRowSelected: function () {
            actionMenu.deleteTableRow.style.display = 'block';
        },
        onFirstDataRendered: (params) => {
            params.api.sizeColumnsToFit();
        }
    },
    agName: 'zip'
}
