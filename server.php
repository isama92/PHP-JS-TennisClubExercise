<?php
    header('Content-Type: application/json');
    require_once("./include/php/error.php");
    require_once("./include/php/db.php");
    require_once("./include/php/function.php");

    $action = isset($_REQUEST["action"]) ? $_REQUEST["action"] : "";
    $action = $mysqli -> connect_errno ? "db_error" : $action;
    $id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;
    $arr = [];

    switch ($action){
        case "getAssociatesList":
            $json_output = getList("select * from soci", $mysqli);
            break;
        case "getFieldsList":
            $json_output = getList("select campi_da_gioco.id,campi_da_gioco.nome,campi_da_gioco.coperto,terreno.descr as tipo from campi_da_gioco join terreno on campi_da_gioco.id_tipo = terreno.id", $mysqli);
            break;
        case "getReservationsList":
            $json_output = getList("select prenotazioni.id,campi_da_gioco.nome as nome_campo,concat(soci.nome, ' ' ,soci.cognome) as socio, DATE_FORMAT(prenotazioni.giorno_ora, '%d-%m-%Y %T') as giorno_ora from prenotazioni join soci on prenotazioni.id_socio = soci.id join campi_da_gioco on prenotazioni.id_campo = campi_da_gioco.id", $mysqli);
            break;
        case "getCardsList":
            $json_output = getList("select * from tesseramenti", $mysqli);
            break;

        case "getAssociatesDetails":
            $json_output = getDetails("select * from soci where id=" . $id, $mysqli);
            break;
        case "getFieldsDetails":
            $json_output = getDetails("select campi_da_gioco.id,campi_da_gioco.nome,campi_da_gioco.coperto,terreno.id as id_terreno from campi_da_gioco join terreno on campi_da_gioco.id_tipo = terreno.id where campi_da_gioco.id = " . $id, $mysqli);
            break;
        case "getReservationsDetails":
            $json_output = getDetails("select prenotazioni.id,campi_da_gioco.nome as nome_campo,campi_da_gioco.id as id_campo,concat(soci.nome, ' ' ,soci.cognome) as socio,soci.id as id_socio, DATE_FORMAT(prenotazioni.giorno_ora, '%d-%m-%Y %T') as giorno_ora  from prenotazioni join soci on prenotazioni.id_socio = soci.id join campi_da_gioco on prenotazioni.id_campo = campi_da_gioco.id where prenotazioni.id = " . $id, $mysqli);
            break;
        case "getCardsDetails":
            $json_output = getDetails("select * from tesseramenti where id=" . $id, $mysqli);
            break;

        case "setAssociatesDetails":
            if($id) $sql = "update soci set nome='" . $_REQUEST["name"] . "', cognome='" . $_REQUEST["surname"] . "', id_tessera=" . $_REQUEST["card_no"] . ", telefono='" . $_REQUEST["phone"] . "' where id=" . $id;
            else    $sql = "insert into soci VALUES (null, '" . $_REQUEST["name"] . "', '" . $_REQUEST["surname"] . "', " . $_REQUEST["card_no"] . ", '" . $_REQUEST["phone"] . "' )";
            $json_output = setField($sql, $mysqli);
            break;
        case "setFieldsDetails":
            if($_REQUEST["id"]!=0)  $sql = "update campi_da_gioco set nome='" . $_REQUEST["name"] . "', id_tipo=" . $_REQUEST["terrain"] . ", coperto=" . $_REQUEST["covered"] . " where id=" . $id;
            else                    $sql = "insert into campi_da_gioco VALUES (null, '" . $_REQUEST["name"] . "', " . $_REQUEST["terrain"] . ", " . $_REQUEST["covered"] . ")";
            $json_output = setField($sql, $mysqli);
            break;
        case "setReservationsDetails":
            if($id!=0)  $sql = "update prenotazioni set id_campo=" . $_REQUEST["id_field"] . ", id_socio=" . $_REQUEST["id_associate"] . ", giorno_ora='" . $_REQUEST["time"] . "' where id=" . $id;
            else        $sql = "insert into prenotazioni VALUES (null, " . $_REQUEST["id_field"] . ", " . $_REQUEST["id_associate"] . ", '" . $_REQUEST["time"] . "')";
            $json_output = setField($sql, $mysqli);
            break;
        case "setCardsDetails":
            if($id!=0)  $sql = "update tesseramenti set anno=" . $_REQUEST["year"] . ", costo=" . $_REQUEST["cost"] . " where id=" . $id;
            else        $sql = "insert into tesseramenti VALUES (null, " . $_REQUEST["year"] . ", " . $_REQUEST["cost"] . ")";
            $json_output = setField($sql, $mysqli);
            break;

        case "card_list":
            $json_output = getTList("select id, id as descr from tesseramenti", $mysqli);
            break;
        case "terrain_list":
            $json_output = getTList("select * from terreno", $mysqli);
            break;
        case "field_list":
            $json_output = getTList("select campi_da_gioco.id as id, concat(campi_da_gioco.nome, ' (', terreno.descr, ' - ', (case when campi_da_gioco.coperto = 1 then 'covered' else 'uncovered' end), ')') as descr  from campi_da_gioco join terreno on campi_da_gioco.id_tipo = terreno.id", $mysqli);
            break;
        case "associate_list":
            $json_output = getTList("select id,concat(soci.nome, ' ' ,soci.cognome) as descr  from soci", $mysqli);
            break;

        case "delete":
            $json_output = deleteRecord($_REQUEST["table"], $id, $mysqli);
            break;

        case "db_error":
            $json_output["error"] = $mysqli -> connect_error;
            $json_output["status"] = "KO";
            break;
        default:
            $json_output["error"] = "No action selected";
            $json_output["status"] = "KO";
            break;
    }
    echo json_encode($json_output);
    $mysqli -> close();
?>