var config = {
    api: {
        postOuterEquipAndLocation: '/api/outerequipwithlocation',

    }
};

function httpRequest(url, method, data = null, idRow = null) {
    if (idRow !== null) url += '/' + idRow;

    return new Promise(function (resolve, reject) {
        var oReq = new XMLHttpRequest();
        oReq.responseType = 'json';
        oReq.open(method, url, true);
        oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        oReq.setRequestHeader('Content-type', 'application/json; charset=utf-8');
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

function downloadFile(url) {
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


