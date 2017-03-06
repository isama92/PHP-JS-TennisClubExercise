"use strict";

class Associate{
    constructor(_data = {}){
        this.id = _data.id || 0;
        this.name = _data.nome || '';
        this.surname = _data.cognome || '';
        this.card = (_data.id_tessera ? this.digits(_data.id_tessera, 5) : 'N/A');
        this.phone = _data.telefono || '';
        this.table = 'soci';
    }

    digits(c, n){return (c.length < n ? this.digits("0"+c, n) : c);}

}

class Card{
    constructor(_data = {}){
        this.id = _data.id || 0;
        this.year = _data.anno || '';
        this.cost = _data.costo || '';
        this.table = 'tesseramenti';
    }
}

class Field{
    constructor(_data = {}){
        this.id = _data.id || 0;
        this.name = _data.nome || '';
        this.type = _data.id_tipo || _data.tipo;
        this.cover = _data.coperto;
        this.table = 'campi_da_gioco';
    }
}

class Reservation{
    constructor(_data = {}){
        this.id = _data.id || 0;
        this.field_ = _data.id_campo || _data.nome_campo;
        this.associate = _data.id_socio || _data.socio;
        this.time = _data.giorno_ora || '';
        this.table = 'prenotazioni';
    }
}

function selectClass(action, data = undefined){
    switch(action){
        case 'getAssociates':
            return new Associate(data);
            break;
        case 'getCards':
            return new Card(data);
            break;
        case 'getFields':
            return new Field(data);
            break;
        case 'getReservations':
            return new Reservation(data);
            break;
    }
}