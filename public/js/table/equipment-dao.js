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


function getData(url) {
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        dataType: 'json'
    }).done(function (response) {
        data = response;
    }).fail(function (jqXHR, textStatus, errorThrown) {
        data = null;
        throw ('data = null');
    });
    return data;
}


function setRowById(idRow, data, url) {
    data._token = $('meta[name=csrf-token]').attr('content');
    $.ajax({
        url: url + '/' + idRow,
        type: "PUT",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data)
    });
}


function deleteById(id, succesDelCallback, url) {
    let data = [{
        name: 'id',
        value: id
    }];
    data = addCSRF(data)
    $.ajax({
        url: url + '/' + id,
        method: 'DELETE',
        data: data,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json'
    }).done(function () {
        succesDelCallback();
    }).fail(function (jqXHR, textStatus, errorThrown) {

    });
}

function postData(data, url, callBackSuccess, callBackError) {
    $.ajax({
        url: url,
        method: 'POST',
        data: data,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json'
    }).done(callBackSuccess).fail(callBackError);
}
