<?php
// set http header
require '../../../../core/header.php';
// include core functions
require '../../../../core/functions.php';


 // get payload from front end
 $body = file_get_contents("php://input");
 $data = json_decode($body, true);

 //CREATE /Post method
 if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $result = require 'create.php';
    sendResponse($result);
    exit;
 }

?>