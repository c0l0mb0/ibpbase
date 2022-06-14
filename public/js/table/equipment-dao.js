var config = {
    api: {
        postOuterEquipAndLocation: 'http://127.0.0.1:8000/api/outerequipwithlocation',
        postInnerEquipByOuterId: 'http://127.0.0.1:8000/api/innerequip',

        deleteOuterEquipAndItsLocation: 'http://127.0.0.1:8000/api/outerequipwithlocation',
        deleteInnerEquip: 'http://127.0.0.1:8000/api/innerequip',

        getDataBuildingAndOuter: 'http://127.0.0.1:8000/api/indexbuildingouter',
        getDataBuildingAndOuterById: 'http://127.0.0.1:8000/api/indexbuildingouterbyid',
        getDataBuildingInnerAndOuter: 'http://127.0.0.1:8000/api/indexbuildingouterinner',
        getDataBuildingInnerAndOuterByOuterId: 'http://127.0.0.1:8000/api/indexbuildingouterinner',
        getDataListOfObjects: 'http://127.0.0.1:8000/api/listofobjects',
        getInnerByOuterId: 'http://127.0.0.1:8000/api/showinnerbyouterid',
        getListLocations: 'http://127.0.0.1:8000/api/listoflocations',
        getListStates: 'http://127.0.0.1:8000/api/listofstates',

        setOuterEquipmentRowById: 'http://127.0.0.1:8000/api/outerequip',
        setInnerEquipmentRowById: 'http://127.0.0.1:8000/api/innerequip',

    }
};

function httpRequest(url, method, data = null, idRow = null) {
    if (idRow !== null) url += '/' + idRow;

    return new Promise(function (resolve, reject) {
        var oReq = new XMLHttpRequest();
        oReq.responseType = 'json';
        oReq.open(method, url);
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
