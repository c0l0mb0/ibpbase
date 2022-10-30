import {config} from './equipment-dao.js'
import {httpRequest} from './equipment-dao.js'
import {addCSRF} from './helper.js'

export default class ModalForm {
    arrLocationFirstLev;
    actionMenu;
    ibpAgGrid;
    agOuterId;
    ui = {
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

    constructor() {
        this.setFormSubmitHandler();
    }


    setFormSubmitHandler() {
        var _this = this;
        this.ui.modalForm.form.addEventListener('submit', function (event) {
            event.preventDefault();
            let inputValues = _this.getInputsArr();
            httpRequest(_this.ui.modalForm.postUrl, 'POST', inputValues).then((e) => {
                _this._hideError();
                _this.hideModal();
                event.target.reset();
                _this.ibpAgGrid.setGridData();
                _this.actionMenu.hideOneRowAction();
            }).catch((e) => {
                _this._hideError();
                console.log(e);
                _this._showError(e);
            })
        });
    }

    _showError(message) {
        this.ui.modalForm.error.innerHTML += 'Ошибка: ' + message.status + ' | ' + message.statusText;
        this.ui.modalForm.error.classList.remove('d-none');
    }

    _hideError() {
        this.ui.modalForm.error.innerHTML = '';
        this.ui.modalForm.error.classList.add('d-none');
    }

    getInputsArr() {
        let data = {};
        let formData = new FormData(this.ui.modalForm.form);
        for (const [key, value] of formData) {
            if (value !== '') {
                data[key] = value;
            }
        }

        if (this.agOuterId !== undefined && (this.ibpAgGrid.agName === "innerEquip" ||
            this.ibpAgGrid.agName === "kapRemont" || this.ibpAgGrid.agName === "tehnObslRemont" ||
            this.ibpAgGrid.agName === "penRen" || this.ibpAgGrid.agName === "tro")) {
            data['outer_id'] = this.agOuterId;
        }
        data = addCSRF(data);
        return data;
    }

    hideModal() {
        let modal = bootstrap.Modal.getInstance(this.ui.modalForm.modal)
        modal.hide()
    }

    createModalEquipLocationList(data) {
        let selectHtml = '';
        this.arrLocationFirstLev.forEach(elementLocation => {
            selectHtml += `<option  value="` + elementLocation.location + `" id="` +
                elementLocation.id + `"> ` + elementLocation.location + `</option>`;
        });
        document.getElementById('place_first_lev').innerHTML = selectHtml;
    }

    createModalEquipStateList(data) {
        let selectHtml = '';
        data.forEach(elementState => {
            selectHtml += `<option>` + elementState.state + `</option>`
        });
        document.getElementById('state_tech_condition').innerHTML = selectHtml;
    }

    setModalLocationByCurrenFilterValue() {
        let modalLocationOption = document.getElementById('place_first_lev');
        if (!modalLocationOption.childNodes || modalLocationOption.childNodes.length === 0) return false;
        if (this.actionMenu.agGridFilter.agLocationFilterId === undefined) {
            modalLocationOption.selectedIndex = 0;
            return;
        }
        for (let items = 0; items < modalLocationOption.length; items++) {
            let item = modalLocationOption[items];
            if (item.id === this.actionMenu.agGridFilter.agLocationFilterId) {
                modalLocationOption.selectedIndex = items;
                return
            }
        }
    }

    setModalZipFormHtml() {
        this.ui.modalForm.caption.innerHTML = 'Добавить прибор в ЗИП';
        this.ui.modalForm.modalBody.innerHTML = modalZipHtml;
        this.ui.modalForm.postUrl = config.api.getByIdPostPutByIdDeleteByIdZipEquipment
    }

    setModalInnerFormHtml() {
        this.ui.modalForm.caption.innerHTML = 'Добавить внутреннее оборудование';
        this.ui.modalForm.modalBody.innerHTML = modalInnerHtml;
        this.ui.modalForm.postUrl = config.api.postInnerEquipByOuterId;
    }

    setModalKapRemontFormHtml() {
        this.ui.modalForm.caption.innerHTML = 'Добавить данные по КР';
        this.ui.modalForm.modalBody.innerHTML = modalKapRemontHtml;
        this.ui.modalForm.postUrl = config.api.getByIdPostPutByIdDeleteByIdKapRemont;
    }

    setModalTehnObslRemontFormHtml() {
        this.ui.modalForm.caption.innerHTML = 'Добавить данные по ТОиР';
        this.ui.modalForm.modalBody.innerHTML = modalTehnObslRemontHtml;
        this.ui.modalForm.postUrl = config.api.getByIdPostPutByIdDeleteByIdTehnObslRemont;
    }

    setModalPenRenFormHtml() {
        this.ui.modalForm.caption.innerHTML = 'Добавить данные по ПЭН/РЭН';
        this.ui.modalForm.modalBody.innerHTML = modalPenRenHtml;
        this.ui.modalForm.postUrl = config.api.getByIdPostPutByIdDeleteByIdPenRen;
        // this.setFormSubmitHandler();
    }

    setModalTroFormHtml() {
        this.ui.modalForm.caption.innerHTML = 'Добавить данные по Актам ТРО';
        this.ui.modalForm.modalBody.innerHTML = modalTroHtml;
        this.ui.modalForm.postUrl = config.api.getByIdPostPutByIdDeleteByIdTro;
    }


    setModalOuterFormHtml() {
        this.ui.modalForm.caption.innerHTML = 'Добавить оборудование';
        this.ui.modalForm.modalBody.innerHTML = modalOuterHtml;
        this.ui.modalForm.postUrl = config.api.postOuterEquipAndLocation;
        httpRequest(config.api.getListLocations, 'GET').then((data) => {
            this.createModalEquipLocationList(data);
        })
        httpRequest(config.api.getListStates, 'GET').then((data) => {
            this.createModalEquipStateList(data);
        })
    }
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
                                <input type="text" class="form-control" id="place_third_lev" required name="place_third_lev">
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
const modalInnerHtml = `
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
                        </div>`;
const modalZipHtml = `
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
                        </div>`;
const modalKapRemontHtml = `
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="year_cap_remont" class="col-form-label">На какой год вкл. в КР</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="year_cap_remont"  name="year_cap_remont">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="replacement_name" class="col-form-label">На что меняется</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="replacement_name"  name="replacement_name">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="act" class="col-form-label">Акт</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="act"  name="act">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="act_link" class="col-form-label">Акт ссылка</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="act_link"  name="act_link">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="dv" class="col-form-label">ДВ</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="dv"  name="dv">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="dv_link" class="col-form-label">ДВ ссылка</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="dv_link"  name="dv_link">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="vor" class="col-form-label">ВОР</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="vor"  name="vor">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="vor_link" class="col-form-label">ВОР ссылка</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="vor_link"  name="vor_link">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="include_kr_plan" class="form-check-label">Включен в план КР</label>
                            </div>
                            <div class="col-9">
                                <input type="checkbox" class="form-check-input" id="include_kr_plan" name="include_kr_plan">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="include_kr_plan_link" class="col-form-label">Включен в план КР ссылка</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="include_kr_plan_link"  name="include_kr_plan_link">
                            </div>
                        </div>
                         <div class="row p-2">
                            <div class="col-3">
                                <label for="done_kr_plan" class="form-check-label">Выполнен КР</label>
                            </div>
                            <div class="col-9">
                                <input type="checkbox" class="form-check-input" id="done_kr_plan" name="done_kr_plan">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="done_kr_plan_link" class="col-form-label">Выполнен КР ссылка</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="done_kr_plan_link"  name="done_kr_plan_link">
                            </div>
                        </div>`;
const modalTehnObslRemontHtml = `
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="year_toir" class="col-form-label">На какой год вкл.ТОиР</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="year_toir"  name="year_toir">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="module_toir" class="col-form-label">Модуль для ТОиР</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="module_toir"  name="module_toir">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="module_replacement_name" class="col-form-label">На что меняется</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="module_replacement_name"  name="module_replacement_name">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="act" class="col-form-label">Акт</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="act"  name="act">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="act_link" class="col-form-label">Акт ссылка</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="act_link"  name="act_link">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="dv" class="col-form-label">ДВ</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="dv"  name="dv">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="dv_link" class="col-form-label">ДВ ссылка</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="dv_link"  name="dv_link">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="vor" class="col-form-label">ВОР</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="vor"  name="vor">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="vor_link" class="col-form-label">ВОР ссылка</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="vor_link"  name="vor_link">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="include_toir_plan" class="form-check-label">Включен в план ТОиР</label>
                            </div>
                            <div class="col-9">
                                <input type="checkbox" class="form-check-input" id="include_toir_plan" name="include_toir_plan">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="include_toir_plan_link" class="col-form-label">Включен в план ТОиР ссылка</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="include_toir_plan_link"  name="include_toir_plan_link">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="done_toir_plan" class="form-check-label">Выполнен ТОиР</label>
                            </div>
                            <div class="col-9">
                                <input type="checkbox" class="form-check-input" id="done_toir_plan" name="done_toir_plan">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="done_toir_plan_link" class="col-form-label">Выполнен ТОиР ссылка</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="done_toir_plan_link"  name="done_toir_plan_link">
                            </div>
                        </div>`;
const modalPenRenHtml = `
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="year_pen_ren" class="col-form-label">На какой год вкл. ПЭН/РЭН</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="year_pen_ren"  name="year_pen_ren">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="defect_act_number" class="col-form-label">Номер деф.акта</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="defect_act_number"  name="defect_act_number">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="defect_act_number_link" class="col-form-label">Деф.акт ссылка</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="defect_act_number_link"  name="defect_act_number_link">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="included_pen_ren" class="col-form-label">Включен в ПЭН/РЭН</label>
                            </div>
                            <div class="col-9">
                                <input type="checkbox" class="form-check-input" id="included_pen_ren"  name="included_pen_ren">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="reason_exclude" class="col-form-label">Причина исключения</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="reason_exclude"  name="reason_exclude">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="reason_exclude_link" class="col-form-label">Причина исключения ссылка</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="reason_exclude_link"  name="reason_exclude_link">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="delivery_ibp_done" class="col-form-label">Поставка выполнена</label>
                            </div>
                            <div class="col-9">
                                <input type="checkbox" class="form-check-input" id="delivery_ibp_done"  name="delivery_ibp_done">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="delivery_ibp_year" class="col-form-label">Поставка год</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="delivery_ibp_year"  name="delivery_ibp_year">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="comments_pen_ren" class="col-form-label">Примечание</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="comments_pen_ren"  name="comments_pen_ren">
                            </div>
                        </div>`;
const modalTroHtml = `
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="act_number" class="col-form-label">Акт номер</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="act_number"  name="act_number">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="act_number_link" class="col-form-label">Акт ссылка</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="act_number_link"  name="act_number_link">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="act_date" class="col-form-label">Дата</label>
                            </div>
                            <div class="col-9">
                                <input type="date" class="form-control" id="act_date"  name="act_date">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="equipment_name" class="col-form-label">Имя оборудования</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="equipment_name"  name="equipment_name">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="act_content" class="col-form-label">Содержание акта</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="act_content"  name="act_content">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="fault_reason" class="col-form-label">Причина неиспр.</label>
                            </div>
                            <div class="col-9">
                                <input type="date" class="form-control" id="fault_reason"  name="fault_reason">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="equipment_state" class="col-form-label">Сост.оборудования</label>
                            </div>
                            <div class="col-9">
                                <input type="date" class="form-control" id="equipment_state"  name="equipment_state">
                            </div>
                        </div>
                        `;
