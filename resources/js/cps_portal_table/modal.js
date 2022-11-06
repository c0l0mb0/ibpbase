import {config} from './cps-portal-dao.js'
import {httpRequest} from './cps-portal-dao.js'
import {addCSRF} from './helper.js'
import tableAgGrid from "./aggrid";

export default class ModalForm {
    actionMenu;
    tableAgGrid;
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
        let _this = this;

        this.ui.modalForm.form.addEventListener('submit', function (event) {
            event.preventDefault();
            let inputValues = _this.getInputsArr();
            httpRequest(_this.ui.modalForm.postUrl, 'POST', inputValues).then((e) => {
                _this._hideError();
                _this.hideModal();
                event.target.reset();
                _this.tableAgGrid.setGridData();
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
        // let formData = new FormData(this.ui.modalForm.form); ie11 compatibility
        let formData = $('#form__new-entry').serializeArray();
        // for (const [key, value] of formData) {
        //     if (value !== '') {
        //         data[key] = value;
        //     }
        // }
        formData.forEach(function (arrayItem) {
            if (arrayItem.value !== '') {
                data[arrayItem.name] = arrayItem.value;
            }
        });
        if (this.agOuterId !== undefined && (this.tableAgGrid.agName === "innerEquip" ||
            this.tableAgGrid.agName === "kapRemont" || this.tableAgGrid.agName === "tehnObslRemont" ||
            this.tableAgGrid.agName === "penRen" || this.tableAgGrid.agName === "tro")) {
            data['outer_id'] = this.agOuterId;
        }
        data = addCSRF(data);
        return data;
    }

    hideModal() {
        // let modal = bootstrap.Modal.getInstance(this.ui.modalForm.modal)
        // modal.hide()
        $('#modal__new-entry').modal('hide');//ie11 compatibility
    }

    // createModalEquipLocationList(data) {
    //     let selectHtml = '';
    //     this.arrLocationFirstLev.forEach(elementLocation => {
    //         selectHtml += `<option  value="` + elementLocation.location + `" id="` +
    //             elementLocation.id + `"> ` + elementLocation.location + `</option>`;
    //     });
    //     document.getElementById('place_first_lev').innerHTML = selectHtml;
    // }

    createModalEquipStateList(data) {
        let selectHtml = '';
        data.forEach(elementState => {
            selectHtml += `<option>` + elementState.state + `</option>`
        });
        document.getElementById('state_tech_condition').innerHTML = selectHtml;
    }



    // setModalOuterFormHtml() {
    //     this.ui.modalForm.caption.innerHTML = 'Добавить оборудование';
    //     this.ui.modalForm.modalBody.innerHTML = modalOuterHtml;
    //     this.ui.modalForm.postUrl = config.api.postOuterEquipAndLocation;
    //     httpRequest(config.api.getListLocations, 'GET').then((data) => {
    //         this.createModalEquipLocationList(data);
    //     })
    //     httpRequest(config.api.getListStates, 'GET').then((data) => {
    //         this.createModalEquipStateList(data);
    //     })
    // }
}


const modalOuterHtml = `
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="place_first_lev" class="col-form-label">Расположение</label>
                            </div>
                            <div class="col-9">
                                <select class="form-control" id="place_first_lev" name="place_first_lev">
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
                                <select class="form-control" id="state_tech_condition" name="state_tech_condition">
                                </select>
                            </div>
                        </div>`;
