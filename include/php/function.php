<?php

function getList($sql, $mysqli){
    $arr = [];
    if($res = $mysqli -> query ($sql)){
        while($row = $res -> fetch_assoc())
            $arr[] = $row;
        $json_output["dati"] = $arr;
        $json_output["status"] = "OK";
    } else
        $json_output = new ErrorManag($mysqli->errno, $mysqli->error, "KO");
    $res -> close();
    return $json_output;
}

function getDetails($sql, $mysqli){
    if($res = $mysqli -> query ($sql)){
        $json_output["dati"] = $res -> fetch_assoc();
        $json_output["status"] = "OK";
    } else
        $json_output = new ErrorManag($mysqli->errno, $mysqli->error, "KO");
    $res -> close();
    return $json_output;
}

function setField($sql, $mysqli){
    if($res = $mysqli -> query ($sql))
        $json_output["status"] = "OK";
    else
        $json_output = new ErrorManag($mysqli->errno, $mysqli->error, "KO");
    return $json_output;
}

function deleteRecord($table, $id, $mysqli){
    if($res = $mysqli -> query ("delete from " . $table . " where id=" . $id))
        $json_output["status"] = "OK";
    else
        $json_output = new ErrorManag($mysqli->errno, $mysqli->error, "KO");
    $res -> close();
    return $json_output;
}

function getTList($query, $mysqli){
    if($res = $mysqli -> query ($query)){
        while($row = $res -> fetch_assoc())
            $arr[] = $row;
    $json_output["dati"] = $arr;
    $json_output["status"] = "OK";
    } else
        $json_output = new ErrorManag($mysqli->errno, $mysqli->error, "KO");
    $res -> close();
    return $json_output;
}

?>