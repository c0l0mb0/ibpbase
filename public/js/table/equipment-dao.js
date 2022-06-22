// var host= 'http://45.142.36.70:80/index.php';
var host= 'http://127.0.0.1:8000'
var config = {
    api: {
        postOuterEquipAndLocation: host + '/api/outerequipwithlocation',
        postInnerEquipByOuterId: host + '/api/innerequip',

        deleteOuterEquipAndItsLocation: host + '/api/outerequipwithlocation',
        deleteInnerEquip: host + '/api/innerequip',

        getDataBuildingAndOuter: host + '/api/indexbuildingouter',
        getDataBuildingAndOuterById: host + '/api/indexbuildingouterbyid',
        getDataBuildingInnerAndOuter: host + '/api/indexbuildingouterinner',
        getDataBuildingInnerAndOuterByOuterId: host + '/api/indexbuildingouterinner',
        getDataListOfObjects: host + '/api/listofobjects',
        getInnerByOuterId: host + '/api/showinnerbyouterid',
        getListLocations: host + '/api/listoflocations',
        getListStates: host + '/api/listofstates',

        setOuterEquipmentRowById: host + '/api/outerequip',
        setInnerEquipmentRowById: host + '/api/innerequip',

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
