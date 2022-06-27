var ui = {
    modalForm: {
        modalClass: undefined,
        formClass: undefined,
        error: undefined,
    },
    modalContainer: document.getElementsByClassName('modal-container')[0],
    showModalButton: document.getElementsByClassName('new-table-row')[0]

};

function _showError(message) {
    ui.modalForm.error = document.querySelector('#form-error');
    ui.modalForm.error.innerHTML += 'Ошибка: ' + message.status + ' | ' + message.statusText;
    ui.modalForm.error.classList.remove('d-none');
}

function _hideError() {
    ui.modalForm.error.classList.add('d-none');
}

function getInputsArr() {

    let data = {};
    let formData = new FormData(ui.modalForm.formClass);
    for (const [key, value] of formData) {
        if (value !== '') {
            data[key] = value;
        }
    }
    if (agOuterId !== undefined && ibpAgGrid.agName === "innerEquip") {
        var name = 'id_outer'
        var value = agOuterId
        data[name] = value;
    }
    data = addCSRF(data);
    return data;
}

function hideModal() {
    let modal = bootstrap.Modal.getInstance(ui.modalForm.modalClass)
    modal.hide()
}

function setFormSubmitHandler(form, postUrl) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let inputValues = getInputsArr();
        httpRequest(postUrl, 'POST', inputValues).then((datums) => {
            _hideError();
            hideModal();
            event.target.reset();
            if (ibpAgGrid.isReady === true) {
                ibpAgGrid.setGridData();
            }
            actionMenu.hideOneRowAction();
        }).catch((e) => {
            _showError(e);
        })
    });
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


function setModalInnerFormHtml() {
    var modalInnerEquip = `
        <div class="modal fade" id="modal-new-inner-equip" tabindex="-1" aria-labelledby="modal-new-equipInnerLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-new-equipInnerLabel">Добавить элемент'</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-form needs-validation" id="form_inner-equipment">
                    <div class="modal-body">
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="inner_name" class="col-form-label">Имя</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="inner_name" required name="inner_name">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="quant" class="col-form-label">Количество</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="quant" required name="quant">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="faсtory_number_inner" class="col-form-label">ЗавНомер</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="faсtory_number_inner" name="faсtory_number_inner">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="year_issue" class="col-form-label">Выпуск</label>
                            </div>
                            <div class="col-9">
                                <input type="date" class="form-control" id="year_issue" name="year_issue">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="inventory_number" class="col-form-label">ИнвНомер</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="inventory_number" name="inventory_number">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="faсtory_name" class="col-form-label">Производитель</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="faсtory_name" name="faсtory_name">
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
                                <label for="purpose" class="col-form-label">Назначение</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="purpose" name="purpose">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="state_tech_condition" class="col-form-label">ТехСост</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="state_tech_condition" name="state_tech_condition">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="state_priority" class="col-form-label">Приоритет</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="state_priority" name="state_priority">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="state_request" class="col-form-label">В заявке?</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="state_request" name="state_request">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="state_approved_request" class="col-form-label">ЗаявПодтв</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="state_approved_request" name="state_approved_request">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="to_four" class="form-check-label">ТО4</label>
                            </div>
                            <div class="col-9">
                                <input type="checkbox" class="form-check-input" id="to_four" name="to_four">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="to_five" class="form-check-label">ТО5</label>
                            </div>
                            <div class="col-9">
                                <input type="checkbox" class="form-check-input" id="to_five" name="to_five">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="tehn_obsl_start" class="col-form-label">ТОстарт</label>
                            </div>
                            <div class="col-9">
                                <input type="date" class="form-control" id="tehn_obsl_start" name="tehn_obsl_start">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="fault_date" class="col-form-label">ДатаПоломки</label>
                            </div>
                            <div class="col-9">
                                <input type="date" class="form-control" id="fault_date" name="fault_date">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="fault_reason" class="col-form-label">ПричинаПоломки</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="fault_reason" name="fault_reason">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="state_delivery_date" class="col-form-label">ДатаПоставки</label>
                            </div>
                            <div class="col-9">
                                <input type="date" class="form-control" id="state_delivery_date" name="state_delivery_date">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="year_exploitation" class="col-form-label">ЭксплСтарт</label>
                            </div>
                            <div class="col-9">
                                <input type="date" class="form-control" id="year_exploitation" name="year_exploitation">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="state_zip" class="col-form-label">ЗИП</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="state_zip" name="state_zip">
                            </div>
                        </div>
                    </div>

                    <div class="row" style="margin: 0;">
                        <mark id="form-error" class="inline-block secondary d-none" style="text-align: center">
                        </mark>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        <button type="submit" class="btn btn-primary modal__sbmit">Сохранить</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
`;
    ui.showModalButton.setAttribute('data-bs-target', '#modal-new-inner-equip');
    ui.modalContainer.innerHTML = modalInnerEquip;
    ui.modalForm.modalClass = document.getElementById('modal-new-inner-equip');
    ui.modalForm.formClass = document.getElementById('form_inner-equipment');
    setFormSubmitHandler(ui.modalForm.modalClass, config.api.postInnerEquipByOuterId);
}

function setModalZipFormHtml() {
    var modalInnerEquip = `
        <div class="modal fade" id="modal-new-zip-equip" tabindex="-1" aria-labelledby="modal-Label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-Label">Добавить прибор в ЗИП</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-form needs-validation" id="form-zip_equipment">
                    <div class="modal-body">
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
                                <label for="quantity" class="col-form-label">Количество</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="quantity" required name="quantity">
                            </div>
                        </div>
                    </div>

                    <div class="row" style="margin: 0;">
                        <mark id="form-error" class="inline-block secondary d-none" style="text-align: center">
                        </mark>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        <button type="submit" class="btn btn-primary modal__sbmit">Сохранить</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
`;
    ui.showModalButton.setAttribute('data-bs-target', '#modal-new-zip-equip');
    ui.modalContainer.innerHTML = modalInnerEquip;
    ui.modalForm.modalClass = document.getElementById('modal-new-zip-equip');
    ui.modalForm.formClass = document.getElementById('form-zip_equipment');
    setFormSubmitHandler(ui.modalForm.modalClass, config.api.getByIdPostPutByIdDeleteByIdZipEquipment);
}


async function setModalOuterFormHtml() {
    var modalOuterEquipBuild = `
        <div class="modal fade" id="modal-new-outer-equip" tabindex="-1" aria-labelledby="modal-new-equipLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-new-equipLabel">Добавить прибор</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-form needs-validation" id="form_outer-equipment-and-location">
                    <div class="modal-body">
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
                                <label for="year_issue" class="col-form-label">Выпуск</label>
                            </div>
                            <div class="col-9">
                                <input type="date" class="form-control" id="year_issue" name="year_issue">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="year_exploitation" class="col-form-label">Эксплуатация</label>
                            </div>
                            <div class="col-9">
                                <input type="date" class="form-control" id="year_exploitation" name="year_exploitation">
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
                        </div>
                    </div>
                    <div class="row" style="margin: 0;">
                        <mark id="form-error" class="inline-block secondary d-none" style="text-align: center">
                        </mark>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        <button type="submit" class="btn btn-primary modal__sbmit">Сохранить</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
`;
    ui.showModalButton.setAttribute('data-bs-target', '#modal-new-outer-equip');
    ui.modalContainer.innerHTML = modalOuterEquipBuild;
    ui.modalForm.modalClass = document.getElementById('modal-new-outer-equip');
    ui.modalForm.formClass = document.getElementById('form_outer-equipment-and-location');
    setFormSubmitHandler(ui.modalForm.modalClass, config.api.postOuterEquipAndLocation);
    createModalEquipLocationList(await httpRequest(config.api.getListLocations, 'GET'));
    createModalEquipStateList(await httpRequest(config.api.getListStates, 'GET'));
}
