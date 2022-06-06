class ActionMenu {


    _newTableRow;
    _deleteTableRow;
    _showInner;
    _showLastOuter;
    _listLocationUl;
    _listLocationsUrl;
    _listLocationsButton;
    _deleteAction;


    hideALl() {
        this._newTableRow.hide();
        this._deleteTableRow.hide();
        this._showInner.hide();
        this._showLastOuter.hide();
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

    get showLastOuter() {
        return this._showLastOuter;
    }

    set showLastOuter(value) {
        this._showLastOuter = value;
    }

    setEditInnerAction() {
        this.showInner.off('click');
        this.showInner.on('click', () => {

            let selectedRows = ibpAgGrid.gridOptions.api.getSelectedRows()
            if (selectedRows.length > 0) {
                let selectedRowId = selectedRows[0][ibpAgGrid.idFieldName];

                if (ibpAgGrid.locationText !== undefined && ibpAgGrid.listLocationId !== undefined) {
                    this.agLocationText = ibpAgGrid.locationText;
                    this.agListLocationId = ibpAgGrid.listLocationId;
                }

                ibpAgGrid = new IbpAgGrid(innerEquipParameters.gridOptions,
                    config.api.getInnerByOuterId + '/' +
                    selectedRowId, config.api.deleteInnerEquip, innerEquipParameters.idFieldName);
                ibpAgGrid.setCurrentIdOuter(selectedRowId)
                setModalInnerFormHtml();
                changePageTitle("Элементы " + selectedRows[0].equip_name);
                this.hideOneRowAction();
                this.listLocationsButton.hide();

                this.showLastOuter.off('click');
                this.showLastOuter.on('click', () => {
                    let getDataUrlWhenClickOuter;
                    if (this.agListLocationId === undefined) {
                        getDataUrlWhenClickOuter = config.api.getDataBuildingAndOuter;
                        changePageTitle("Приборы");
                    } else {
                        getDataUrlWhenClickOuter = config.api.getDataBuildingAndOuterById + '/' + this.agListLocationId;
                        changePageTitle("Приборы => " + this.agLocationText);
                    }
                    ibpAgGrid = new IbpAgGrid(buildingAndOuterEquipParameters.gridOptions,
                        getDataUrlWhenClickOuter, config.api.deleteOuterEquipAndItsLocation,
                        buildingAndOuterEquipParameters.idFieldName);
                    this.showLastOuter.hide();
                    setModalOuterFormHtml();
                    this.createListForLocationFilter();
                    this.setLocationFilterOnClickAction();
                });
                this.showLastOuter.show();
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
            $.each(data, function (key, val) {
                selectHtml += `<li><a class="dropdown-item-location_` + val.id + `" id="` +
                    val.id + `" href="#">` + val.location + `</a></li>`;
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
                        ibpAgGrid.setGridData(getData(config.api.getDataBuildingAndOuter));
                        agLocationFilterId = undefined;
                        agLocationFilterText = undefined;
                        changePageTitle('Приборы');
                    }
                } else {
                    item.onclick = () => {
                        ibpAgGrid.setGridData(getData(config.api.getDataBuildingAndOuterById + '/' + id));
                        agLocationFilterId = id;
                        agLocationFilterText = item.innerText;
                        changePageTitle('Приборы => ' + agLocationFilterText);
                    }
                }
            }
        }
    }
}
