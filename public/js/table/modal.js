var ui = {
    modalForm: {
        modalClass: undefined,
        formClass: undefined,
        error: $('#form_outer-equipment-and-location__error')
    },
    modalContainer: $('.modal-container'),
    showModalButton: $(".new-table-row")
};


function _showError(message) {
    ui.modalForm.error.text(message);
    ui.modalForm.error.removeClass('d-none');
}

function _hideError() {
    ui.modalForm.error.addClass('d-none');
}

function getAgGridCurrentIdOuter() {
    if (ibpAgGrid.isReady === true) {
        return ibpAgGrid.getCurrentIdOuter();
    }
}

function getInputsArr() {
    let inputValues = ui.modalForm.formClass.serializeArray();
    for (let i = inputValues.length - 1; i >= 0; i--) {
        if (inputValues[i].value === '') {
            inputValues.splice(i, 1);
        }
    }
    return inputValues;
}

function setFormSubmitHandler(form, postUrl, getUrl) {
    console.log(getUrl)
    console.log(form)
    form.submit(event => {
        event.preventDefault();
        let inputValues = getInputsArr();
        let currentIdOuter = getAgGridCurrentIdOuter();
        if (currentIdOuter !== undefined) {
            inputValues.push({name: 'id_outer', value: currentIdOuter});
        }
        $.ajax({
            url: postUrl,
            method: 'POST',
            data: inputValues,
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            success: () => {
                _hideError()
                form.modal('hide');
                form.trigger("reset");
                if (ibpAgGrid.isReady === true) {
                    if (currentIdOuter == undefined) {
                        ibpAgGrid.setGridData(getData(getUrl));
                    } else {
                        ibpAgGrid.setGridData(getData(getUrl + '/' + currentIdOuter));
                    }
                }
                actionMenu.hideOneRowAction();
            },
            error: function (response) {
                console.log(response)
                _showError("Ошибка, попробуйте еще раз");
            }
        });
    });
}

function createModalEquipLocationList(data) {
    let selectHtml = '';
    $.each(data, function (key, val) {
        selectHtml += `<option>` + val.place_first_lev + `</option>`
    });
    $(".modal__place_first_lev-select").append(selectHtml);
}


function setModalInnerFormHtml() {
    var modalInnerEquip = `
        <div class="modal fade" id="modal-new-inner-equip" tabindex="-1" aria-labelledby="modal-new-equipInnerLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-new-equipInnerLabel">Добавить прибор</h5>
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
                                <label for="state_zip" class="col-form-label">ЗИП</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="state_zip" name="state_zip">
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
                                <label for="tehn_obsl_hours" class="col-form-label">ТОчасы</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="tehn_obsl_hours" name="tehn_obsl_hours">
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
                                <input type="date" class="form-control" id="fault_reason" name="fault_reason">
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
                                <label for="faсtory_number_inner" class="col-form-label">ЗавНомер</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="faсtory_number_inner" name="faсtory_number_inner">
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
                                <label for="purpose" class="col-form-label">Назначение</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="purpose" name="purpose">
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
                                <label for="year_issue" class="col-form-label">Выпуск</label>
                            </div>
                            <div class="col-9">
                                <input type="date" class="form-control" id="year_issue" name="year_issue">
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
                                <label for="voltage" class="col-form-label">Напряжение</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="voltage" name="voltage">
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin: 0;">
                        <mark id="form_outer-equipment-and-location__error" class="inline-block secondary d-none" >Текст
                            ошибки
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
    ui.showModalButton.attr('data-bs-target', '#modal-new-inner-equip');
    ui.modalContainer.html(modalInnerEquip);
    ui.modalForm.modalClass = $('#modal-new-inner-equip');
    ui.modalForm.formClass = $('#form_inner-equipment');
    setFormSubmitHandler(ui.modalForm.modalClass, config.api.postInnerEquipByOuterId, config.api.getInnerByOuterId);
}

function setModalOuterFormHtml() {
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
                                <label for="place_zero_lev" class="col-form-label">Уренгой|Ямб</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="place_zero_lev" name="place_zero_lev">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="place_first_lev" class="col-form-label">Расположение</label>
                            </div>
                            <div class="col-9">
                                <select class="form-select modal__place_first_lev-select" id="place_first_lev" name="place_first_lev">
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
                                <label for="power" class="col-form-label">Мощнсоть</label>
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
                                <label for="voltage" class="col-form-label">Напруга</label>
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
                                <input type="text" class="form-control" id="state_tech_condition" name="state_tech_condition">
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin: 0;">
                        <mark id="form_outer-equipment-and-location__error" class="inline-block secondary d-none" >Текст
                            ошибки
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
    ui.showModalButton.attr('data-bs-target', '#modal-new-outer-equip');
    ui.modalContainer.html(modalOuterEquipBuild);
    ui.modalForm.modalClass = $('#modal-new-outer-equip');
    ui.modalForm.formClass = $('#form_outer-equipment-and-location');
    setFormSubmitHandler(ui.modalForm.modalClass, config.api.postOuterEquipAndLocation, config.api.getDataBuildingAndOuter);
    var data = getData(config.api.getDataListOfObjects);
    createModalEquipLocationList(data);
}
