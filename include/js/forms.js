"use strict";

function selectForm(row, action){
    var str = '<form class="form">';
    switch(action){
        case "getAssociates":
                str +=  '<div class="form-group">' +
                            '<label for="name">Name</label>' +
                            '<input type="text" class="form-control" name="name" value="' + row.name + '" placeholder="Name">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="surname">Surname</label>' +
                            '<input type="text" class="form-control" name="surname" value="' + row.surname + '" placeholder="Surname">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="card_no">Card No.</label>' +
                            '<select name="card_no" class="form-control list-card_list"><option value="null">N/A</option></select>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="phone">Phone</label>' +
                            '<input type="text" class="form-control" name="phone" value="' + row.phone + '" placeholder="Phone">' +
                        '</div>';
                break;
            case "getFields":
                var uncov = '';
                var cov = '';
                parseInt(row.cover)? cov = 'checked' : uncov = 'checked';
                str +=  '<div class="form-group">' +
                            '<label for="name">Name</label>' +
                            '<input type="text" class="form-control" name="name" value="' + row.name + '" placeholder="Name">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="terrain">Terrain</label>' +
                            '<select name="terrain" class="form-control list-terrain_list"></select>' +
                        '</div>' +
                        '<div class="radio-inline"><label><input type="radio" name="covered" value="0" ' + uncov + '>Not Covered</label></div>' +
                        '<div class="radio-inline"><label><input type="radio" name="covered" value="1" ' + cov + '>Covered</label></div>';
                break;
            case "getReservations":
                str +=   '<div class="form-group">' +
                            '<label for="field">Field</label>' +
                            '<select name="field" class="form-control list-field_list"></select>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="associate">Associate</label>' +
                            '<select name="associate" class="form-control list-associate_list"></select>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="time">Date</label>' +
                            '<input type="text" class="form-control" id="datepicker" name="time" value="' + row.time + '" placeholder="Time">' +
                        '</div>';
                break;
            case "getCards":
                str +=  '<div class="form-group">' +
                            '<label for="year">Year</label>' +
                            '<input type="text" class="form-control" name="year" value="' + row.year + '" placeholder="Year">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="cost">Cost</label>' +
                            '<input type="text" class="form-control" name="cost" value="' + row.cost + '" placeholder="Cost">' +
                        '</div>';
                break;
            default:
                break;
    }
    str +=      '<a href="javascript:  getSubmitValues(' + row.id + ', \'' + action + '\');" class="btn btn-default form-submit-button" >Submit</a>' +
            '</form>';
    return str;
}

function getSubmitValues(id, action){
    switch(action){
        case 'getAssociates':
            submitDetails('setAssociatesDetails&id=' + id + '&name=' + $('.form [name=name]').val() + '&surname=' + $('.form [name=surname]').val() + '&card_no=' + $('.form [name=card_no]').val() + '&phone=' + $('.form [name=phone]').val(), action);
            break;
        case 'getFields':
            submitDetails('setFieldsDetails&id=' + id + '&name=' + $('.form [name=name]').val() + '&terrain=' + $('.form [name=terrain]').val() + '&covered=' + $('.form [name=covered]:checked').val(), action);
            break;
        case 'getReservations':
            submitDetails('setReservationsDetails&id=' + id + '&id_field=' + $('.form [name=field]').val() + '&id_associate=' + $('.form [name=associate]').val() + '&time=' + format_datetime($('.form [name=time]').val()), action);
            break;
        case 'getCards':
            submitDetails('setCardsDetails&id=' + id + '&cost=' + $('.form [name=cost]').val() + '&year=' + $('.form [name=year]').val(), action);
            break;
        default:
            break;
    }
}

function append2form(action, row = {}){
    switch(action){
        case 'getAssociates':
            tList('card_list',row.card? row.card : '');
            break;
        case 'getFields':
            tList('terrain_list', row.id? row.id : '');
            break;
        case 'getReservations':
            tList('associate_list', row.associate? row.associate : '');
            tList('field_list', row.field? row.field : '');
            $('#datepicker').datetimepicker({format:'d-m-Y H:i:s', minDate: '-1970/01/01', startDate: '-1970/01/01'});
            break;
        default:
            break;
    }
}