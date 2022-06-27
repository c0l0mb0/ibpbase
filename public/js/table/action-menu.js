class ActionMenu {

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
    }

    showOneRowAction() {
        this.deleteTableRow.style.display = 'block';
        this.showInner.style.display = 'block';
        this.showCapRemont.style.display = 'block';
        this.showToir.style.display = 'block';
        this.showPenRen.style.display = 'block';
        this.showTro.style.display = 'block';
    }

    hideOneRowAction() {
        this.deleteTableRow.style.display = 'none';
        this.showInner.style.display = 'none';
        this.showCapRemont.style.display = 'none';
        this.showToir.style.display = 'none';
        this.showPenRen.style.display = 'none';
        this.showTro.style.display = 'none';
    }
    ///////////////////////////
    ////inner outer actions////
    ///////////////////////////
    setEditInnerAction() {
        // this.showInner.off('click');
        this.showInner.onclick = () => {
            let selectedRow = ibpAgGrid.getSelectedRow()
            agOuterId = selectedRow.id;
            ibpAgGrid = new IbpAgGrid(innerEquipParameters.gridOptions,
                config.api.getInnerByOuterId + '/' +
                agOuterId, config.api.deleteInnerEquip, innerEquipParameters.agName);
            setModalInnerFormHtml();
            changePageTitle( selectedRow.place_first_lev + " => " +
                selectedRow.equip_name + " => Элементы" );
            this.hideOneRowAction();
            this.listLocationsButton.style.display = 'none';
            this.setReturnToOuterAction();

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
            ibpAgGrid = new IbpAgGrid(buildingAndOuterEquipParameters.gridOptions,
                getDataUrl, config.api.deleteOuterEquipAndItsLocation, buildingAndOuterEquipParameters.agName);
            agOuterId = undefined;
            this.returnToOuter.style.display = 'none';
            setModalOuterFormHtml();
            this.createLocationFilter();
        };
        this.returnToOuter.style.display = 'block';
    }

    //////////////
    ////filter////
    //////////////
    createLocationFilter() {
        if (this.listLocationsUrl !== undefined) {
            httpRequest(this.listLocationsUrl, 'GET').then((data) => {
                this.createListForLocationFilter(data);
                this.setLocationFilterOnClickAction();
            });
        }
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
                        ibpAgGrid.getDataUrl = config.api.getDataBuildingAndOuter;
                        ibpAgGrid.setGridData();
                        this.agGridFilter.agLocationFilterId = undefined;
                        this.agGridFilter.agLocationFilterText = undefined;
                        changePageTitle('Приборы');
                        setModalLocationByCurrenFilterValue();
                    }
                } else {
                    item.onclick = () => {
                        ibpAgGrid.getDataUrl = config.api.getDataBuildingAndOuterById + '/' + id;
                        ibpAgGrid.setGridData();
                        this.agGridFilter.agLocationFilterId = id;
                        this.agGridFilter.agLocationFilterText = item.innerText;
                        changePageTitle('Приборы => ' + this.agGridFilter.agLocationFilterText);
                        setModalLocationByCurrenFilterValue();
                    }
                }

            }
        }

    }
}
