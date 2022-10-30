import {config} from './equipment-dao.js'
import {changePageTitle} from './helper.js';
import * as aggrid from './aggrid.js'

export default class ActionMenu {
    arrLocationFirstLev;
    agOuterId;
    ibpAgGrid;
    modalForm;
    newTableRow;
    deleteTableRow;
    showInner;
    returnToOuter;
    listLocationUl;
    listLocationsUrl;
    listLocationsButton;
    deleteAction;
    showCapRemont;
    showToir;
    showPenRen;
    showTro;
    exportExcel;
    agGridFilter = {
        agLocationFilterId: undefined,
        agLocationFilterText: undefined
    }

    hideALl() {
        this.newTableRow.style.display = 'none';
        this.deleteTableRow.style.display = 'none';
        this.showInner.style.display = 'none';
        this.returnToOuter.style.display = 'none';
        this.listLocationsButton.style.display = 'none';
        this.showCapRemont.style.display = 'none';
        this.showToir.style.display = 'none';
        this.showPenRen.style.display = 'none';
        this.showTro.style.display = 'none';
        this.exportExcel.style.display = 'none';
    }

    showOneRowAction() {
        this.deleteTableRow.style.display = 'block';
        this.showInner.style.display = 'block';
        this.showCapRemont.style.display = 'block';
        this.showToir.style.display = 'block';
        this.showPenRen.style.display = 'block';
        this.showTro.style.display = 'block';
    }

    setRowActionForNotEditableGrid() {
        this.newTableRow.style.display = 'none';
    }

    hideOneRowAction() {
        this.deleteTableRow.style.display = 'none';
        this.showInner.style.display = 'none';
        this.showCapRemont.style.display = 'none';
        this.showToir.style.display = 'none';
        this.showPenRen.style.display = 'none';
        this.showTro.style.display = 'none';
    }

    ////inner outer actions////
    setEditInnerAction() {
        this.showInner.onclick = () => {
            let selectedRow = this.ibpAgGrid.getSelectedRow();
            this.agOuterId = selectedRow.id;
            this.ibpAgGrid = new aggrid.IbpAgGrid(aggrid.agGridParameters.innerEquipParameters.gridOptions,
                config.api.getInnerByOuterId + '/' +
                this.agOuterId, config.api.deleteInnerEquip, aggrid.agGridParameters.innerEquipParameters.agName, this);
            this.modalForm.ibpAgGrid = this.ibpAgGrid;
            this.modalForm.agOuterId = this.agOuterId;
            this.modalForm.setModalInnerFormHtml();
            changePageTitle(selectedRow.place_first_lev + " => " +
                selectedRow.equip_name + " => Элементы");
            this.hideOneRowAction();
            this.listLocationsButton.style.display = 'none';
            this.setReturnToOuterAction();

        };
    }

    ////Kap Remont actions////
    setEditKapRemontAction() {
        this.showCapRemont.onclick = () => {
            let selectedRow = this.ibpAgGrid.getSelectedRow()
            this.agOuterId = selectedRow.id;
            this.ibpAgGrid = new aggrid.IbpAgGrid(aggrid.agGridParameters.kapRemontParameters.gridOptions,
                config.api.getByIdOuterKapRemont + '/' +
                this.agOuterId, config.api.getByIdPostPutByIdDeleteByIdKapRemont,
                aggrid.agGridParameters.kapRemontParameters.agName, this);
            this.modalForm.ibpAgGrid = this.ibpAgGrid;
            this.modalForm.agOuterId = this.agOuterId;
            this.modalForm.setModalKapRemontFormHtml();
            changePageTitle(selectedRow.place_first_lev + " => " +
                selectedRow.equip_name + " => Данные по капремонту");
            this.hideOneRowAction();
            this.listLocationsButton.style.display = 'none';
            this.setReturnToOuterAction();

        };
    }

    ////Tehn Obsl Remont actions////
    setEditTehnObslRemontAction() {
        this.showToir.onclick = () => {
            let selectedRow = this.ibpAgGrid.getSelectedRow()
            this.agOuterId = selectedRow.id;
            this.ibpAgGrid = new aggrid.IbpAgGrid(aggrid.agGridParameters.tehnObslRemontParameters.gridOptions,
                config.api.getByIdOuterTehnObslRemont + '/' +
                this.agOuterId, config.api.getByIdPostPutByIdDeleteByIdTehnObslRemont,
                aggrid.agGridParameters.tehnObslRemontParameters.agName, this);
            this.modalForm.ibpAgGrid = this.ibpAgGrid;
            this.modalForm.agOuterId = this.agOuterId;
            this.modalForm.setModalTehnObslRemontFormHtml();
            changePageTitle(selectedRow.place_first_lev + " => " +
                selectedRow.equip_name + " => Данные по ТОиР");
            this.hideOneRowAction();
            this.listLocationsButton.style.display = 'none';
            this.setReturnToOuterAction();

        };
    }

    ////Pen Ren actions////
    setEditPenRenAction() {
        this.showPenRen.onclick = () => {
            let selectedRow = this.ibpAgGrid.getSelectedRow()
            this.agOuterId = selectedRow.id;
            this.ibpAgGrid = new aggrid.IbpAgGrid(aggrid.agGridParameters.penRenParameters.gridOptions,
                config.api.getByIdOuterPenRen + '/' +
                this.agOuterId, config.api.getByIdPostPutByIdDeleteByIdPenRen,
                aggrid.agGridParameters.penRenParameters.agName, this);
            this.modalForm.ibpAgGrid = this.ibpAgGrid;
            this.modalForm.agOuterId = this.agOuterId;
            this.modalForm.setModalPenRenFormHtml();
            changePageTitle(selectedRow.place_first_lev + " => " +
                selectedRow.equip_name + " => Данные по ПЭН/РЭН");
            this.hideOneRowAction();
            this.listLocationsButton.style.display = 'none';
            this.setReturnToOuterAction();

        };
    }

    ////Tro actions////
    setEditTroAction() {
        this.showTro.onclick = () => {
            let selectedRow = this.ibpAgGrid.getSelectedRow()
            this.agOuterId = selectedRow.id;
            this.ibpAgGrid = new aggrid.IbpAgGrid(aggrid.agGridParameters.troParameters.gridOptions,
                config.api.getByIdOuterTro + '/' +
                this.agOuterId, config.api.getByIdPostPutByIdDeleteByIdTro,
                aggrid.agGridParameters.troParameters.agName, this);
            this.modalForm.ibpAgGrid = this.ibpAgGrid;
            this.modalForm.agOuterId = this.agOuterId;
            this.modalForm.setModalTroFormHtml();
            changePageTitle(selectedRow.place_first_lev + " => " +
                selectedRow.equip_name + " => Данные по Актам ТРО");
            this.hideOneRowAction();
            this.listLocationsButton.style.display = 'none';
            this.setReturnToOuterAction();

        };
    }

    ////Excel export action////
    setExportExcelAction() {
        this.exportExcel.onclick = () => {
            this.ibpAgGrid.exportDisplyedDataToExcel();
        };
    }

    setReturnToOuterAction() {
        this.returnToOuter.onclick = () => {
            let getDataUrl;
            if (this.agGridFilter.agLocationFilterId === undefined) {
                getDataUrl = config.api.getDataBuildingAndOuter;
                changePageTitle("Приборы");
            } else {
                getDataUrl = config.api.getDataBuildingAndOuterById + '/' + this.agGridFilter.agLocationFilterId;
                changePageTitle("Приборы => " + this.agGridFilter.agLocationFilterText);
            }
            this.ibpAgGrid = new aggrid.IbpAgGrid(aggrid.agGridParameters.buildingAndOuterEquipParameters.gridOptions,
                getDataUrl, config.api.deleteOuterEquipAndItsLocation,
                aggrid.agGridParameters.buildingAndOuterEquipParameters.agName, this);
            this.modalForm.ibpAgGrid = this.ibpAgGrid;
            this.agOuterId = undefined;
            this.returnToOuter.style.display = 'none';
            this.modalForm.setModalOuterFormHtml();
            this.createLocationFilter();
        };
        this.returnToOuter.style.display = 'block';
    }

    ////filter////
    createLocationFilter() {
        // if (this.listLocationsUrl !== undefined) {
        //     httpRequest(this.listLocationsUrl, 'GET').then((data) => {
        //         this.createListForLocationFilter(data);
        //         this.setLocationFilterOnClickAction();
        //     });
        // }
        this.createListForLocationFilter(this.arrLocationFirstLev);
        this.setLocationFilterOnClickAction();
    }

    createListForLocationFilter(data) {
        let selectHtml = '<li><a class="dropdown-item-location_all" id="all" href="#">Все</a></li>';
        data.forEach(elementLocation => {
            selectHtml += `<li><a class="dropdown-item-location_` + elementLocation.id + `"  id="` +
                elementLocation.id + `" href="#">` + elementLocation.location + `</a></li>`;
        });
        this.listLocationUl.innerHTML = selectHtml;
    }

    setLocationFilterOnClickAction() {
        if (!this.listLocationUl.childNodes || this.listLocationUl.childNodes.length === 0) return false;
        for (let items = 0; items < this.listLocationUl.childNodes.length; items++) {
            let item = this.listLocationUl.childNodes[items].firstChild;
            if (item.nodeName === "A") {
                let id = item.id;
                if (id === 'all') {
                    item.onclick = () => {
                        this.ibpAgGrid.getDataUrl = config.api.getDataBuildingAndOuter;
                        this.ibpAgGrid.setGridData();
                        this.agGridFilter.agLocationFilterId = undefined;
                        this.agGridFilter.agLocationFilterText = undefined;
                        changePageTitle('Приборы');
                        this.modalForm.setModalLocationByCurrenFilterValue();
                    }
                } else {
                    item.onclick = () => {
                        this.ibpAgGrid.getDataUrl = config.api.getDataBuildingAndOuterById + '/' + id;
                        this.ibpAgGrid.setGridData();
                        this.agGridFilter.agLocationFilterId = id;
                        this.agGridFilter.agLocationFilterText = item.innerText;
                        changePageTitle('Приборы => ' + this.agGridFilter.agLocationFilterText);
                        this.modalForm.setModalLocationByCurrenFilterValue();
                    }
                }

            }
        }

    }
}


