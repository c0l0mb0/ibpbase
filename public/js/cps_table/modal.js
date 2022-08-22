var ui = {
    modalForm: {
        caption: document.getElementById('modal__caption'),
        modal: document.getElementById('modal__new-entry'),
        modalBody: document.querySelector('.modal__form__body'),
        form: document.getElementById('form__new-entry'),
        error: document.getElementById('form__error'),
    },
    modalContainer: document.querySelector('.modal-container'),
    showModalButton: document.querySelector('.new-table-row'),
    postUrl: undefined
};

function _showError(message) {
    ui.modalForm.error.innerHTML += 'Ошибка: ' + message.status + ' | ' + message.statusText;
    ui.modalForm.error.classList.remove('d-none');
}

function _hideError() {
    ui.modalForm.error.innerHTML = '';
    ui.modalForm.error.classList.add('d-none');
}

function getInputsArr() {

    let data = {};
    let formData = new FormData(ui.modalForm.form);
    for (const [key, value] of formData) {
        if (value !== '') {
            data[key] = value;
        }
    }

    if (agOuterId !== undefined && (ibpAgGrid.agName === "innerEquip" ||
        ibpAgGrid.agName === "kapRemont" || ibpAgGrid.agName === "tehnObslRemont" ||
        ibpAgGrid.agName === "penRen" || ibpAgGrid.agName === "tro")) {
        data['outer_id'] = agOuterId;
    }
    data = addCSRF(data);
    return data;
}

function hideModal() {
    let modal = bootstrap.Modal.getInstance(ui.modalForm.modal)
    modal.hide()
}

const submitModalFormHandler = function (event) {
    event.preventDefault();
    let inputValues = getInputsArr();
    httpRequest(ui.modalForm.postUrl, 'POST', inputValues).then((e) => {
        _hideError();
        hideModal();
        event.target.reset();
        if (ibpAgGrid.isReady === true) {
            ibpAgGrid.setGridData();
        }
        actionMenu.hideOneRowAction();
    }).catch((e) => {
        _hideError();
        console.log(e);
        _showError(e);
    })
}

function setFormSubmitHandler() {
    ui.modalForm.form.removeEventListener('submit', submitModalFormHandler);
    ui.modalForm.form.addEventListener('submit', submitModalFormHandler);
}

function createModalEquipLocationList(data) {
    let selectHtml = '';
    data.forEach(elementLocation => {
        selectHtml += `<option  value="` + elementLocation.location + `" id="` +
            elementLocation.id + `"> ` + elementLocation.location + `</option>`;
    });
    document.getElementById('place_first_lev').innerHTML = selectHtml;
}

function createModalEquipStateList(data) {
    let selectHtml = '';
    data.forEach(elementState => {
        selectHtml += `<option>` + elementState.state + `</option>`
    });
    document.getElementById('state_tech_condition').innerHTML = selectHtml;
}

function setModalLocationByCurrenFilterValue() {
    let modalLocationOption = document.getElementById('place_first_lev');
    if (!modalLocationOption.childNodes || modalLocationOption.childNodes.length === 0) return false;
    if (actionMenu.agGridFilter.agLocationFilterId === undefined) {
        modalLocationOption.selectedIndex = 0;
        return;
    }
    for (let items = 0; items < modalLocationOption.length; items++) {
        let item = modalLocationOption[items];
        if (item.id === actionMenu.agGridFilter.agLocationFilterId) {
            modalLocationOption.selectedIndex = items;
            return
        }
    }
}

async function setModalOuterFormHtml() {
    ui.modalForm.caption.innerHTML = 'Добавить оборудование';
    ui.modalForm.modalBody.innerHTML = modalOuterHtml;
    ui.modalForm.postUrl = config.api.postOuterEquipAndLocation;
    setFormSubmitHandler();
    createModalEquipLocationList(await httpRequest(config.api.getListLocations, 'GET'));
    createModalEquipStateList(await httpRequest(config.api.getListStates, 'GET'));
}

const modalOuterHtml = `
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="place_first_lev" class="col-form-label">Расположение</label>
                            </div>
                            <div class="col-9">
                                <select class="form-select" id="place_first_lev" name="place_first_lev">
                                </select>
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="place_third_lev" class="col-form-label">Место</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="place_third_lev" name="place_third_lev">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="affiliate" class="col-form-label">Филиал</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="affiliate" name="affiliate">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="equip_name" class="col-form-label">Название</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="equip_name" required name="equip_name">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="inner_equipment.factory_number" class="col-form-label">Зав.Номер</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="inner_equipment.factory_number" required name="factory_number">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="factory_name" class="col-form-label">Изготовитель</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="factory_name" name="factory_name">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="inventory_number" class="col-form-label">Инв.Номер</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="inventory_number" name="inventory_number">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="numb_vvod" class="col-form-label">Ном.ввода</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="numb_vvod" name="numb_vvod">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="purpose" class="col-form-label">Назначение</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="purpose" name="purpose">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="year_issue_date" class="col-form-label">Выпуск</label>
                            </div>
                            <div class="col-9">
                                <input type="date" class="form-control" id="year_issue_date" name="year_issue_date">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="year_exploitation_date" class="col-form-label">Эксплуатация</label>
                            </div>
                            <div class="col-9">
                                <input type="date" class="form-control" id="year_exploitation_date" name="year_exploitation_date">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="power" class="col-form-label">Мощноть</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="power" name="power">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="current" class="col-form-label">Ток</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="current" name="current">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="voltage" class="col-form-label">Напряжение</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="voltage" name="voltage">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="state_tech_condition" class="col-form-label">Состояние</label>
                            </div>
                            <div class="col-9">
                                <select class="form-select" id="state_tech_condition" name="state_tech_condition">
                                </select>
                            </div>
                        </div>`;



