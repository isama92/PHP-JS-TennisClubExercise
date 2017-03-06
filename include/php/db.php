<?php
    $db_cfg = parse_ini_file($_SERVER["DOCUMENT_ROOT"] . "Artoo/PHP/Secondo/include/config/database.ini");
    @$mysqli = new mysqli ($db_cfg["server"], $db_cfg["username"], $db_cfg["password"], $db_cfg["dbname"]);
?>