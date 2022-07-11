document.getElementById('sidebarCollapse').onclick = () => {
    document.getElementById('sidebar').classList.toggle("active");
};

document.querySelector('.sidebar-edit_equip').onclick = () => {
    ibpAgGrid = new IbpAgGrid(buildingAndOuterEquipParameters.gridOptions,
        config.api.getDataBuildingAndOuter, config.api.deleteOuterEquipAndItsLocation, buildingAndOuterEquipParameters.agName);
    setModalOuterFormHtml();
    actionMenu.setEditInnerAction();
    actionMenu.setEditKapRemontAction();
    actionMenu.setEditTehnObslRemontAction();
    actionMenu.setEditPenRenAction();
    actionMenu.setEditTroAction();

    actionMenu.createLocationFilter();
    changePageTitle("Приборы");
};

document.querySelector('.sidebar-edit_zip').onclick = () => {
    ibpAgGrid = new IbpAgGrid(zipParameters.gridOptions,
        config.api.getZipEquipmentAll, config.api.getByIdPostPutByIdDeleteByIdZipEquipment, zipParameters.agName);
    actionMenu.listLocationsButton.style.display = 'none';
    setModalZipFormHtml()
    changePageTitle("ЗИП");
}
document.querySelector('.sidebar__show-kap-remont').onclick = () => {

    ibpAgGrid = new IbpAgGrid(buildingOuterEquipKapRemontParameters.gridOptions,
        config.api.getKapRemontOuterEquipAll, null, buildingOuterEquipKapRemontParameters.agName);
    actionMenu.setRowActionForNotEditableGrid();
}
document.querySelector('.sidebar__show-tehn-obsl-remont').onclick = () => {
    ibpAgGrid = new IbpAgGrid(buildingOuterEquipTehnObslRemontParameters.gridOptions,
        config.api.getTehnObslRemontOuterEquipAll, null, buildingOuterEquipTehnObslRemontParameters.agName);
    actionMenu.setRowActionForNotEditableGrid();
}
document.querySelector('.sidebar__show-pen-ren').onclick = () => {
    ibpAgGrid = new IbpAgGrid(buildingOuterEquipPenRenParameters.gridOptions,
        config.api.getPenRenOuterEquipAll, null, buildingOuterEquipPenRenParameters.agName);
    actionMenu.setRowActionForNotEditableGrid();
}
document.querySelector('.sidebar__show-tro').onclick = () => {
    ibpAgGrid = new IbpAgGrid(buildingOuterEquipTroParameters.gridOptions,
        config.api.getTroOuterEquipAll, null, buildingOuterEquipTroParameters.agName);
    actionMenu.setRowActionForNotEditableGrid();
}


