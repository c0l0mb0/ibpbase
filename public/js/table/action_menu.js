var actionMenu = {
    newTableRow: $('.new-table-row'),
    deleteTableRow: $('.delete-table-row'),
    showInner: $('.show-inner'),
    hideALl: function () {
        $('.new-table-row').hide();
        $('.delete-table-row').hide();
        $('.show-inner').hide();
    },
    showNewRowAction: () => $('.new-table-row').show(),
    showOneRowAction: () => {
        $('.delete-table-row').show();
        $('.show-inner').show();
    },
    hideOneRowAction: () => {
        $('.delete-table-row').hide();
        $('.show-inner').hide();
    }
};

