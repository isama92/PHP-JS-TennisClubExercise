<?php
class ErrorManag{
    public $err_no;
    public $err_msg;
    public $status;
    
    function __construct($_n = 0, $_m = "Undefined", $_s){
        $this->err_no = $_n;
        $this->err_msg = $_m;
        $this->status = $_s;
    }

    function getErrorMessage(){
        return "Error " . $this->err_no . ": " . $this->err_msg . ".<br><br>Please contact the administrator.";
    }
}
?>