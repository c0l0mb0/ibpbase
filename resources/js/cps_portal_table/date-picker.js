export default class DatePicker {
    init(params) {
        flatpickr.localize(flatpickr.l10ns.ru);
        this.input = document.createElement("input");
        this.input.value = params.value;
        this.input.flatpickr();
    }

    getGui() {
        return this.input;
    }

    afterGuiAttached() {
        this.input.focus();
        this.input.select();
    }

    getValue() {
        return this.input.value;
    }

    destroy() {
    }

    isPopup() {
        return false;
    }
}
