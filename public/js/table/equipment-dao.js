var config = {
    api: {
        postOuterEquipAndLocation: '/api/outerequipwithlocation',
        postInnerEquipByOuterId: '/api/innerequip',
        setOuterEquipmentRowById: '/api/outerequip',
        deleteOuterEquipAndItsLocation: '/api/outerequipwithlocation',
        getDataBuildingAndOuter: '/api/indexbuildingouter',
        getDataBuildingAndOuterById: '/api/indexbuildingouterbyid',
        getDataBuildingInnerAndOuter: '/api/indexbuildingouterinner',
        getDataBuildingInnerAndOuterByOuterId: '/api/indexbuildingouterinner',
        getDataListOfObjects: '/api/listofobjects',

        getInnerByOuterId: '/api/showinnerbyouterid',
        setInnerEquipmentRowById: '/api/innerequip',
        deleteInnerEquip: '/api/innerequip',

        getListLocations: '/api/listoflocations',
        getListStates: '/api/listofstates',

        getKapRemontAll:'/api/kapremontall',
        getByIdPostPutByIdDeleteByIdKapRemont:'/api/kapremont',

        getTehnObslRemontAll:'/api/tehnobslremontall',
        getByIdPostPutByIdDeleteByIdTehnObslRemont:'/api/tehnobslremont',

        getPenRenAll:'/api/penrenall',
        getByIdPostPutByIdDeleteByIdPenRen:'/api/penren',

        getTroAll:'/api/troall',
        getByIdPostPutByIdDeleteByIdTro:'/api/tro',

        getZipEquipmentAll:'/api/zipall',
        getByIdPostPutByIdDeleteByIdZipEquipment:'/api/zip',

    }
};

function httpRequest(url, method, data = null, idRow = null) {
    if (idRow !== null) url += '/' + idRow;

    return new Promise(function (resolve, reject) {
        var oReq = new XMLHttpRequest();
        oReq.responseType = 'json';
        oReq.open(method, url);
        oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        oReq.setRequestHeader('Content-type','application/json; charset=utf-8');
        oReq.onload = function () {
            if (oReq.status >= 200 && oReq.status < 300) {
                resolve(oReq.response);
            } else {
                reject({
                    status: oReq.status,
                    statusText: oReq.statusText
                });
            }
        };
        oReq.onerror = function () {
            reject({
                status: oReq.status,
                statusText: oReq.statusText
            });
        };
        oReq.send(JSON.stringify(data));
    });
}
