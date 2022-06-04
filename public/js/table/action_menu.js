class ActionMenu {
    _newTableRow;
    _deleteTableRow;
    _showInner;
    _showLastOuter;
    _listLocationUl;
    _listLocationsUrl;
    _listLocationsButton;

    constructor() {
    }

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

    createOuterEquipLocationList() {
        if (this._listLocationsUrl !== undefined) {
            let data = getData(this._listLocationsUrl);
            let selectHtml = '<li><a class="dropdown-item-location" id="all" href="#">Все</a></li>';
            $.each(data, function (key, val) {
                selectHtml += `<li><a class="dropdown-item-location" id="` +
                    val.id + `" href="#">` + val.location + `</a></li>`;
            });
            this._listLocationUl.append(selectHtml);
            let ul = document.querySelector("#action-menu-dropdown-locations");
            if (!ul.childNodes || ul.childNodes.length === 0) return false;
            for (let items = 0; items < ul.childNodes.length; items++) {
                let item = ul.childNodes[items].firstChild;
                if (item.nodeName === "A") {

                }
            }
        }
    }
}

