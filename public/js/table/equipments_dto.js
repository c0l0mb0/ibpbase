var config = {
    api: {
        postOuterEquipAndLocation: 'http://ibp/api/public/index.php/api/v1/outerequipwithlocation',
        postInnerEquipByOuterId:'http://ibp/api/public/index.php/api/v1/innerequip',

        deleteOuterEquipAndItsLocation: 'http://ibp/api/public/index.php/api/v1/outerequipwithlocation',
        deleteInnerEquip: 'http://ibp/api/public/index.php/api/v1/innerequip',

        getDataBuildingAndOuter: 'http://ibp/api/public/index.php/api/v1/indexbuildingouter',
        getDataBuildingInnerAndOuter: 'http://ibp/api/public/index.php/api/v1/indexbuildingouterinner',
        getDataBuildingInnerAndOuterByOuterId: 'http://ibp/api/public/index.php/api/v1/indexbuildingouterinner',
        getDataListOfObjects: 'http://ibp/api/public/index.php/api/v1/listofobjects',
        getInnerByOuterId: 'http://ibp/api/public/index.php/api/v1/showinnerbyouterid',

        setOuterEquipmentRowById: 'http://ibp/api/public/index.php/api/v1/outerequip',
        setInnerEquipmentRowById: 'http://ibp/api/public/index.php/api/v1/innerequip'
    }
};


function getData(url) {
    var data = {};
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

function getEquipmentByFirstLevelName(FirstLevelName) {

    $.ajax({
        url: "http://ibp/api/public/index.php/api/v1/indexouterandinnerbyfirstlevvalue",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({"place_first_lev": FirstLevelName}),
        success: function (data) {
            renderOuterInterTableStatement(data);
        }, error: function (xhr, resp, text) {
            // console.log(xhr, resp, text);
        }
    });
}

function deleteById(id, succesDelCallback, url) {

    $.ajax({
        url: url + '/' + id,
        method: 'DELETE',
        data: id,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json'
    }).done(function (response) {
        succesDelCallback();
    }).fail(function (jqXHR, textStatus, errorThrown) {

    });
}