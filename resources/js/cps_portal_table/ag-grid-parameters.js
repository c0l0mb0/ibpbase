import DatePicker from "./date-picker";
import {config, httpRequest} from "./cps-portal-dao";
import {addCSRF} from "./helper";


export let agGridParameters = {
    agOuterId: undefined,
    actionMenu: undefined,
    workersParameters: {
        gridOptions: {
            domLayout: 'autoHeight',
            columnDefs: [
                {headerName: "ФИО", field: "fio", minWidth: 100, tooltipField: 'fio'},
                {headerName: "N табеля", field: "tab_nom", minWidth: 100, tooltipField: 'tab_nom'},
                {headerName: "Должность", field: "worker_position", minWidth: 100, tooltipField: 'worker_position'},
            ],
            rowSelection: 'single',
            defaultColDef: {
                resizable: true,
                editable: true,
            },
            enableBrowserTooltips: true,
            onCellValueChanged: function (event) {
                httpRequest(config.api.postPutDeleteWorkers, "PUT",
                    addCSRF(event.data), event.data.id).catch((rejected) => console.log(rejected));
            },
            onRowSelected: function () {
                agGridParameters.actionMenu.showOneRowAction();
            },
            onFirstDataRendered: (params) => {
                params.api.sizeColumnsToFit();
            }
        },
        agName: 'workers',
    },
    fireInstrParameters: {
        gridOptions: {
            domLayout: 'autoHeight',
            columnDefs: [
                {headerName: "ФИО", field: "fio", minWidth: 100, tooltipField: 'fio', editable: false},
                {headerName: "N табеля", field: "tab_nom", minWidth: 100, tooltipField: 'tab_nom', editable: false},
                {
                    headerName: "Должность",
                    field: "worker_position",
                    minWidth: 100,
                    tooltipField: 'worker_position',
                    editable: false
                },
                {
                    headerName: "ПоследняяПроверка",
                    field: "date_check_last",
                    minWidth: 100,
                    tooltipField: 'date_check_last',
                    cellEditor: DatePicker
                },
                {
                    headerName: "СледующаяПроверка",
                    field: "date_check_next",
                    minWidth: 100,
                    tooltipField: 'date_check_next',
                    cellEditor: DatePicker
                },
            ],
            rowSelection: 'single',
            defaultColDef: {
                resizable: true,
                editable: true,
            },
            enableBrowserTooltips: true,
            onCellValueChanged: function (event) {
                httpRequest(config.api.postPutDeleteWorkers, "PUT", addCSRF(event.data), event.data.id).catch((rejected) => console.log(rejected));
            },
            onRowSelected: function () {
                agGridParameters.actionMenu.showOneRowAction();
            },
            onFirstDataRendered: (params) => {
                params.api.sizeColumnsToFit();
            }
        },
        agName: 'fireInstr',
    },
}
