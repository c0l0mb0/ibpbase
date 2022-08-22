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



