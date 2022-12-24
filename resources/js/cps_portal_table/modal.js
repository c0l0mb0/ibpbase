import {config} from './cps-portal-dao.js'
import {httpRequest} from './cps-portal-dao.js'
import {addCSRF} from './helper.js'
import ModalAggrid from "./modal-aggrid.js";
import {agGridParameters} from "./ag-grid-parameters";

export default class ModalForm {
    actionMenu;
    tableAgGrid;
    agBuildingId;
    agBuildingName;
    modalTableAgGrid;
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
        modalDialog: document.querySelector('.modal-dialog'),
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
                _this.actionMenu.hideAllOneRowAction();
            }).catch((e) => {
                _this._hideError();
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
        let formData = $('#form__new-entry').serializeArray();

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


    createModalEquipStateList(data) {
        let selectHtml = '';
        data.forEach(elementState => {
            selectHtml += `<option>` + elementState.state + `</option>`
        });
        document.getElementById('state_tech_condition').innerHTML = selectHtml;
    }

    setModalStyleToNormal() {
        this.ui.modalDialog.style.maxWidth = '400px';
    }

    setModalStyleToAggrid() {
        this.ui.modalDialog.style.maxWidth = '900px';
    }

    setModalWorkersFormHtml() {
        this.ui.modalForm.caption.innerHTML = 'Добавить работника';
        this.ui.modalForm.modalBody.innerHTML = modalNewWorker;
        this.ui.modalForm.postUrl = config.api.postPutDeleteWorkers;
    }

    setModalCpsBuildingsFormHtml() {
        this.ui.modalForm.caption.innerHTML = 'Добавить здание';
        this.ui.modalForm.modalBody.innerHTML = modalNewBuilding;
        this.ui.modalForm.postUrl = config.api.postPutDeleteBuildings;
    }

    setModalCpsEquipmentFormHtml() {
        this.ui.modalForm.caption.innerHTML = 'Добавить оборудование';
        this.ui.modalForm.modalBody.innerHTML = modalNewEquipment;
        this.ui.modalForm.postUrl = config.api.postPutDeleteEquipment;
    }

    setModalNewEquipmentInBuildingHtml() {
        this.ui.modalForm.caption.innerHTML = 'Добавить оборудование в ' + this.agBuildingName;
        this.ui.modalForm.modalBody.innerHTML = modalNewEquipmentInBuilding;
        this.setModalStyleToAggrid();
        this.modalTableAgGrid = new ModalAggrid(agGridParameters.equipmentForChooseParameters.gridOptions,
            config.api.getEquipmentALl, agGridParameters.equipmentForChooseParameters.agName);
    }
}

const modalNewEquipmentInBuilding = `
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="equip_search" class="col-form-label">Поиск</label>
                            </div>
                            <div class="col-9">
                                 <input type="text" class="form-control" id="equip_search"  name="equip_search">
                            </div>
                        </div>
                        <div class="modal-aggrid-wrapper">
                            <div id="modal-aggrid" style="width: 100%; height: 100%;"></div>
                        </div>`;


const modalNewWorker = `
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="fio" class="col-form-label">Ф.И.О.</label>
                            </div>
                            <div class="col-9">
                                 <input type="text" class="form-control" id="fio" required name="fio">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="tab_nom" class="col-form-label">Тебельный N</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="tab_nom" required name="tab_nom" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*)\\./g, '$1');">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="worker_position" class="col-form-label">Должность</label>
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control" id="worker_position" name="worker_position">
                            </div>
                        </div>`;

const modalNewBuilding = `
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="area" class="col-form-label">Участок</label>
                            </div>
                            <div class="col-9">
                                 <input type="text" class="form-control" id="area" required name="area">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="group_1" class="col-form-label">Группа</label>
                            </div>
                            <div class="col-9">
                                 <input type="text" class="form-control" id="group_1" required name="group_1">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="group_2" class="col-form-label">Подгруппа</label>
                            </div>
                            <div class="col-9">
                                 <input type="text" class="form-control" id="group_2"  name="group_2">
                            </div>
                        </div>
                         <div class="row p-2">
                            <div class="col-3">
                                <label for="shed" class="col-form-label">Здание</label>
                            </div>
                            <div class="col-9">
                                 <input type="text" class="form-control" id="shed" required name="shed">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="Queue" class="col-form-label">Очередь</label>
                            </div>
                            <div class="col-9">
                                 <input type="text" class="form-control" id="Queue"  name="Queue">
                            </div>
                        </div>
                         <div class="row p-2">
                            <div class="col-3">
                                <label for="affiliate" class="col-form-label">Филиал</label>
                            </div>
                            <div class="col-9">
                                 <input type="text" class="form-control" id="affiliate" required name="affiliate">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="type_aups" class="col-form-label">ТипАУПС</label>
                            </div>
                            <div class="col-9">
                                 <input type="text" class="form-control" id="type_aups" required name="type_aups">
                            </div>
                        </div>`;
const modalNewEquipment = `
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="app_name" class="col-form-label">Название</label>
                            </div>
                            <div class="col-9">
                                 <input type="text" class="form-control" id="app_name" required name="app_name">
                            </div>
                        </div>
                         <div class="row p-2">
                            <div class="col-3">
                                <label for="kind_app" class="col-form-label">ТипОбобщенный</label>
                            </div>
                            <div class="col-9">
                                 <input type="text" class="form-control" id="kind_app" required name="kind_app">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="kind_app_second" class="col-form-label">Тип</label>
                            </div>
                            <div class="col-9">
                                 <input type="text" class="form-control" id="kind_app_second" required name="kind_app_second">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="kind_signal" class="col-form-label">ТипСигнала</label>
                            </div>
                            <div class="col-9">
                                 <input type="text" class="form-control" id="kind_signal" required name="kind_signal">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-3">
                                <label for="brand_name" class="col-form-label">Производитель</label>
                            </div>
                            <div class="col-9">
                                 <input type="text" class="form-control" id="brand_name" required name="brand_name">
                            </div>
                        </div>`;
