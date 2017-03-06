"use strict";

var path = 'index.html';
history.pushState(null, null, path + window.location.search);
window.addEventListener('popstate', function (event) {
    history.pushState(null, null, path + window.location.search);
});

function digits(n,ndigit){
    return (n.length < ndigit ? digits("0"+n, ndigit) : n);
}

function clearErrorDiv(){
    $('.col-error').html('');
}

function menuActive(menu){
    $('.menu-home, .menu-getAssociates, .menu-getCards, .menu-getFields, .menu-getReservations').removeClass('active');
    $('.menu-' + menu).addClass('active');
}

function format_datetime(datetime){
    datetime = datetime.split(" ");
    var date = datetime[0].split('-');
    return (date[2] + '-' + date[1] + '-' + date[0] + ' ' + datetime[1]);
}

function home(){
    clearErrorDiv();
    menuActive('home');
    $('.col-container').html("Welcome!");
}

$(document).ready(function(){
    $('#loading-container').hide();
    $('.container').show();
    home();
});