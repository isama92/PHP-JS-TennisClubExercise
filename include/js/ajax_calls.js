"use strict";

function getList(action){
    clearErrorDiv();
    menuActive(action);
    $.ajax({
        url: 'server.php?action=' + action + 'List',
        success: function(response){
            if(response.status == "OK"){
                var strHead = '';
                var strBody = '';
                var tab = [];
                for(var data of response.dati) // create array of objects
                    tab.push(selectClass(action, data));
                for(var row of tab){ // contruct html table line by line
                    strBody += '<tr>';
                    for(var key of Object.getOwnPropertyNames(row)) // get class properties and for each of them write a column in html table
                        if(key!='table')
                            strBody += '<td onclick="getDetails(' + row.id + ', \'' + action + '\');">' + row[key] + '</td>';
                    strBody += '<td onclick="deleteRow(' + row.id + ', \'' + row.table + '\', \'' + action + '\');"><i class="fa fa-trash" aria-hidden="true"></i></td></tr>';
                }

                for (key of Object.getOwnPropertyNames(row))
                    if(key != 'table')
                        strHead += '<th>' + key + '</th>';

                // BUILD HTML TABLE
                $('.col-container').html('<table class="table table-condensed table-hover"><thead><tr>' + strHead + '<th>&nbsp;</th></tr></thead>');
                $('.col-container table').append('<tbody>' + strBody + '</tbody></table>');
                $('.col-container table').append('<button onclick="getDetails(0, \'' + action + '\');" class="btn btn-default">Add New</button>');3
            } else
                $('.col-error').html('Error ' + response.err_no + ': ' + response.err_msg);
            
        },
        error: function(){
            $('.col-error').html('Error 01: Ajax call failed.');
        }
    });
}

function getDetails(id, action){
    clearErrorDiv();
    if(id!=0)
        $.ajax({
            url: 'server.php?action=' + action + 'Details&id=' + id,
            success: function(response){
                var row = selectClass(action, response.dati);
                if(response.status=="OK"){
                    $('.col-container').html(selectForm(row, action));
                    append2form(action, row);
                }
            },
            error: function(){
                $('.col-error').html("Ajax error.");
            }
        });
    else{
        $('.col-container').html(selectForm(selectClass(action, (selectClass(action))), action));
        append2form(action);
    }
}

function submitDetails(url_action, action){
    clearErrorDiv();
    $.ajax({
        url: 'server.php?action=' + url_action,
        success: function(response){
            if(!response.status == "OK") $('.col-error').html("Query error.");
        },
        error: function(){
            $('.col-error').html("Ajax error.");
        },
        complete: function(){
            getList(action);
        }
    })
}

function deleteRow(id, table, action){
    clearErrorDiv();
    $.ajax({
        url: 'server.php?action=delete&id=' + id + '&table=' + table,
        success: function(response){
            if(!response.status == "OK") $('.col-error').html("Query error.");
        },
        error: function(){
            $('.col-error').html("Ajax error.");
        },
        complete: function(){
            getList(action);
        }
    })
}

function tList(action, sel_id = -1){
    $.ajax({
        url: 'server.php?action=' + action,
        success: function(response){
            var str = '';
            var selected;
            for(var v of response.dati)
                str += '<option value="' + v.id + '" ' + (sel_id == (action=='card_list'? digits(v.id, 5) : v.id) ? 'selected' : '') + '>' + (action=='card_list'?digits(v.id, 5) : v.descr) + '</option>';
            $('.list-' + action).append(str);
        },
        error: function(){
            $('.col-error').html("Ajax error.");
        }
    })
}