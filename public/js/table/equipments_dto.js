var config = {
    api: {
        postOuterEquipAndLocation: 'http://127.0.0.1:8000/api/outerequipwithlocation',
        postInnerEquipByOuterId: 'http://127.0.0.1:8000/api/innerequip',

        deleteOuterEquipAndItsLocation: 'http://127.0.0.1:8000/api/outerequipwithlocation',
        deleteInnerEquip: 'http://127.0.0.1:8000/api/innerequip',

        getDataBuildingAndOuter: 'http://127.0.0.1:8000/api/indexbuildingouter',
        getDataBuildingInnerAndOuter: 'http://127.0.0.1:8000/api/indexbuildingouterinner',
        getDataBuildingInnerAndOuterByOuterId: 'http://127.0.0.1:8000/api/indexbuildingouterinner',
        getDataListOfObjects: 'http://127.0.0.1:8000/api/listofobjects',
        getInnerByOuterId: 'http://127.0.0.1:8000/api/showinnerbyouterid',

        setOuterEquipmentRowById: 'http://127.0.0.1:8000/api/outerequip',
        setInnerEquipmentRowById: 'http://127.0.0.1:8000/api/innerequip'
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
        data: JSON.stringify(data),
        success: function (data) {
        },
        error: function (xhr, resp, text) {
            // console.log(xhr, resp, text);
        }
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
    }).done(function (response) {
        succesDelCallback();
    }).fail(function (jqXHR, textStatus, errorThrown) {

    });
}
