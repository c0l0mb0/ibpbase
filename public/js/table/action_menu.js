class ActionMenu {
    _newTableRow;
    _deleteTableRow;
    _showInner;
    _returnToOuter;
    _listLocationUl;
    _listLocationsUrl;
    _listLocationsButton;
    _deleteAction;
    agGridFilter = {
        agLocationFilterId: undefined,
        agLocationFilterText: undefined
    }


    hideALl() {
        this._newTableRow.hide();
        this._deleteTableRow.hide();
        this._showInner.hide();
        this._returnToOuter.hide();
        this._listLocationsButton.hide();
    }

    showOneRowAction() {
        this._deleteTableRow.show();
        this._showInner.show();
    }

    hideOneRowAction() {
        this._deleteTableRow.hide();
        this._showInner.hide();
    }

    get deleteAction() {
        return this._deleteAction;
    }

    set deleteAction(value) {
        this._deleteAction = value;
    }

    get listLocationsButton() {
        return this._listLocationsButton;
    }

    set listLocationsButton(value) {
        this._listLocationsButton = value;
    }

    get listLocationUl() {
        return this._listLocationUl;
    }

    set listLocationUl(value) {
        this._listLocationUl = value;
    }

    get listLocationsUrl() {
        return this._listLocationsUrl;
    }

    set listLocationsUrl(value) {
        this._listLocationsUrl = value;
    }

    get newTableRow() {
        return this._newTableRow;
    }

    set newTableRow(value) {
        this._newTableRow = value;
    }

    get deleteTableRow() {
        return this._deleteTableRow;
    }

    set deleteTableRow(value) {
        this._deleteTableRow = value;
    }

    get showInner() {
        return this._showInner;
    }

    set showInner(value) {
        this._showInner = value;
    }

    get returnToOuter() {
        return this._returnToOuter;
    }

    set returnToOuter(value) {
        this._returnToOuter = value;
    }

    setReturnToOuterAction() {
        this.returnToOuter.off('click');
        this.returnToOuter.on('click', () => {
            let getDataUrl;
            if (this.agGridFilter.agLocationFilterId === undefined) {
                getDataUrl = config.api.getDataBuildingAndOuter;
                changePageTitle("Приборы");
            } else {
                getDataUrl = config.api.getDataBuildingAndOuterById + '/' + this.agGridFilter.agLocationFilterId;
                changePageTitle("Приборы => " + this.agGridFilter.agLocationFilterText);
            }
            ibpAgGrid = new IbpAgGrid(buildingAndOuterEquipParameters.gridOptions,
                getDataUrl, config.api.deleteOuterEquipAndItsLocation,
                buildingAndOuterEquipParameters.idFieldName, buildingAndOuterEquipParameters.agName);
            agOuterId = undefined;
            this.returnToOuter.hide();
            setModalOuterFormHtml();
            this.createLocationFilter();
        });
        this.returnToOuter.show();
    }

    setEditInnerAction() {
        this.showInner.off('click');
        this.showInner.on('click', () => {

            let selectedRows = ibpAgGrid.gridOptions.api.getSelectedRows()
            if (selectedRows.length > 0) {
                agOuterId = selectedRows[0][ibpAgGrid.idFieldName];
                ibpAgGrid = new IbpAgGrid(innerEquipParameters.gridOptions,
                    config.api.getInnerByOuterId + '/' +
                    agOuterId, config.api.deleteInnerEquip, innerEquipParameters.idFieldName,innerEquipParameters.agName);
                setModalInnerFormHtml();
                changePageTitle("Элементы => " + selectedRows[0].place_first_lev + " => " + selectedRows[0].equip_name);
                this.hideOneRowAction();
                this.listLocationsButton.hide();
                this.setReturnToOuterAction();
            }
        });
    }

    createLocationFilter() {
        this.createListForLocationFilter();
        this.setLocationFilterOnClickAction();
    }

    createListForLocationFilter() {
        if (this._listLocationsUrl !== undefined) {
            let data = getData(this._listLocationsUrl);
            let selectHtml = '<li><a class="dropdown-item-location_all" id="all" href="#">Все</a></li>';
            let locationCount = 0;
            $.each(data, function (key, val) {
                selectHtml += `<li><a class="dropdown-item-location_` + val.id + `"  id="` +
                    val.id + `" href="#">` + val.location + `</a></li>`;
                locationCount++;
            });
            this.listLocationUl.innerHTML = selectHtml;
        }
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
                        ibpAgGrid.refreshData();
                        this.agGridFilter.agLocationFilterId = undefined;
                        this.agGridFilter.agLocationFilterText = undefined;
                        changePageTitle('Приборы');
                        setModalLocationByCurrenFilterValue();
                    }
                } else {
                    item.onclick = () => {
                        ibpAgGrid.getDataUrl = config.api.getDataBuildingAndOuterById + '/' + id;
                        ibpAgGrid.refreshData();
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
