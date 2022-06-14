// document.getElementById('idebarCollapse').on('click', function () {
//     $('#sidebar').toggleClass('active');
// });
document.getElementById('sidebarCollapse').onclick = () => {
    document.getElementById('sidebar').classList.toggle("active");
};

// $('.all-equip').on('click', function () {
// ibpAgGridOuterAndLocation = new IbpAgGrid(buildingAndOuterGridOptions, getData(config.api.getDataBuildingAndOuter));
// changePageTitle("Состояние");
// });

document.getElementsByClassName('edit_equip')[0].onclick = () => {

    ibpAgGrid = new IbpAgGrid(buildingAndOuterEquipParameters.gridOptions,
        config.api.getDataBuildingAndOuter, config.api.deleteOuterEquipAndItsLocation, buildingAndOuterEquipParameters.agName);
    setModalOuterFormHtml();
    actionMenu.setEditInnerAction();
    actionMenu.createLocationFilter();
    changePageTitle("Приборы");

};

// $('.edit_elements').on('click', () => {
// ibpAgGridOuterAndLocation = new IbpAgGrid(buildingAndOuterInnerGridOptions, getData(config.api.getDataBuildingInnerAndOuter));
// changePageTitle("Элементы");
// actionMenu.HideOneRowAction();
// });
