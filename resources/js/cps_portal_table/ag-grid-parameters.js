import DatePicker from "./ag_grid_classes/date-picker";
import {config, httpRequest} from "./cps-portal-dao";
import {addCSRF, dateFormatter} from "./helper";
import NumericCellEditor from "./ag_grid_classes/numericCellEditor.js";

export let agGridParameters = {
    agOuterId: undefined,
    actionMenu: undefined,
    workersParameters: {
        gridOptions: {
            domLayout: 'autoHeight',
            columnDefs: [
                {headerName: "ФИО", field: "fio", minWidth: 100, tooltipField: 'fio',sortable: true},
                {
                    headerName: "N табеля",
                    field: "tab_nom",
                    minWidth: 100,
                    tooltipField: 'tab_nom',
                    cellEditor: NumericCellEditor,
                },
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
                {
                    headerName: "ФИО",
                    field: "fio",
                    minWidth: 130,
                    tooltipField: 'fio',
                    editable: false,
                    sortable: true
                },
                {
                    headerName: "N табеля",
                    field: "tab_nom",
                    minWidth: 40,
                    tooltipField: 'tab_nom',
                    editable: false,
                },
                {
                    headerName: "Должность",
                    field: "worker_position",
                    minWidth: 100,
                    tooltipField: 'worker_position',
                    editable: false,
                },
                {
                    headerName: "ПоследняяПроверка",
                    field: "fire_instr_last",
                    minWidth: 60,
                    tooltipField: 'fire_instr_last',
                    cellEditor: DatePicker,
                    valueFormatter: (params) => {
                        if (params.data.fire_instr_last !== undefined && params.data.fire_instr_last !== null) {
                            let dateAsString = params.data.fire_instr_last;
                            let dateParts = dateAsString.split('-');
                            return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
                        }
                    },
                },
                {
                    headerName: "СледующаяПроверка",
                    field: "fire_instr_next",
                    minWidth: 60,
                    tooltipField: 'fire_instr_next',
                    cellEditor: DatePicker,
                    valueFormatter: (params) => {
                        if (params.data.fire_instr_next !== undefined && params.data.fire_instr_next !== null) {
                            let dateAsString = params.data.fire_instr_next;
                            let dateParts = dateAsString.split('-');
                            return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
                        }

                    },
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
                agGridParameters.actionMenu.showPlusSixMonthButton();
            },
            onFirstDataRendered: (params) => {
                params.api.sizeColumnsToFit();
            }
        },
        agName: 'fireInstr',
    },
}
