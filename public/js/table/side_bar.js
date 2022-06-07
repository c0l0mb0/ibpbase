$('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
});

$('.all-equip').on('click', function () {
    // ibpAgGridOuterAndLocation = new IbpAgGrid(buildingAndOuterGridOptions, getData(config.api.getDataBuildingAndOuter));
    // changePageTitle("Состояние");
});

$('.edit_equip').on('click', () => {

    ibpAgGrid = new IbpAgGrid(buildingAndOuterEquipParameters.gridOptions,
        config.api.getDataBuildingAndOuter, config.api.deleteOuterEquipAndItsLocation,
        buildingAndOuterEquipParameters.idFieldName, buildingAndOuterEquipParameters.agName);
    setModalOuterFormHtml();
    actionMenu.setEditInnerAction();
    actionMenu.createLocationFilter();
    changePageTitle("Приборы");

});

$('.edit_elements').on('click', () => {
    // ibpAgGridOuterAndLocation = new IbpAgGrid(buildingAndOuterInnerGridOptions, getData(config.api.getDataBuildingInnerAndOuter));
    // changePageTitle("Элементы");
    // actionMenu.HideOneRowAction();
});
