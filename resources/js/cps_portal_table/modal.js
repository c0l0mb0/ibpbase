import {config} from './cps-portal-dao.js'
import {httpRequest} from './cps-portal-dao.js'
import {addCSRF} from './helper.js'

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

    setModalWorkersFormHtml() {
        this.ui.modalForm.caption.innerHTML = 'Добавить работника';
        this.ui.modalForm.modalBody.innerHTML = modalNewWorker;
        this.ui.modalForm.postUrl = config.api.postPutDeleteWorkers;
    }

}


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
