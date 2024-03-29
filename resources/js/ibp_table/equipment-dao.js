import {isIE11browser} from "./helper.js";

let url = window.location
let splitUrl = url.toString().split('/');
splitUrl = splitUrl.slice(0, -1);
let UrlPathWithoutLastDirectory = splitUrl.join("/")

export var config = {
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

        getKapRemontAll: '/api/kapremontall',
        getByIdPostPutByIdDeleteByIdKapRemont: '/api/kapremont',
        getByIdOuterKapRemont: '/api/kapremontbyouterid',
        getKapRemontOuterEquipAll: '/api/kapremont-outer-building',
        downloadKapRemontAll: '/api/kapremont-export',

        getTehnObslRemontAll: '/api/tehnobslremontall',
        getByIdPostPutByIdDeleteByIdTehnObslRemont: '/api/tehnobslremont',
        getByIdOuterTehnObslRemont: '/api/tehnobslremontbyouerid',
        getTehnObslRemontOuterEquipAll: '/api/tehn-obsl-remont-outer-building',
        downloadTehnObslRemontAll: '/api/tehn-obsl-remont-export',

        getPenRenAll: '/api/penrenall',
        getByIdPostPutByIdDeleteByIdPenRen: '/api/penren',
        getByIdOuterPenRen: '/api/penrenbyouterid',
        getPenRenOuterEquipAll: '/api/pen-ren-outer-building',
        downloadPenRenAll: '/api/pen-ren-export',

        getTroAll: '/api/troall',
        getByIdPostPutByIdDeleteByIdTro: '/api/tro',
        getByIdOuterTro: '/api/trobyouterid',
        getTroOuterEquipAll: '/api/tro-outer-building',
        downloadTroAll: '/api/tro-export',

        getZipEquipmentAll: '/api/zipall',
        getByIdPostPutByIdDeleteByIdZipEquipment: '/api/zip',

    }
};

Object.keys(config.api).forEach(key => {
    config.api[key] = UrlPathWithoutLastDirectory + config.api[key];
});

export function httpRequest(url, method, data = null, idRow = null) {
    if (idRow !== null) url += '/' + idRow;

    return new Promise(function (resolve, reject) {
        var oReq = new XMLHttpRequest();
        // oReq.responseType = 'json'; ie11 compatibility
        oReq.open(method, url, true);
        oReq.responseType = "json";
        oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        oReq.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        oReq.onload = function () {
            if (oReq.status >= 200 && oReq.status < 300) {
                if (isIE11browser) { //ie11 compatibility
                    let res = JSON.parse(oReq.response);
                    resolve(res);
                } else {
                    let res = JSON.stringify(oReq.response);
                    res = JSON.parse(res);
                    resolve(res);
                }

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

export function downloadFile(url) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "blob";
    oReq.onload = function (event) {
        var blob = oReq.response;
        var fileName = oReq.getResponseHeader("fileName") //if you have the fileName header available
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url)
    };

    oReq.send();
}


