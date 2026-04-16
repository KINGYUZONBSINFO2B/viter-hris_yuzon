<?php
// set http header
require '../../../../core/header.php';
// include core functions
require '../../../../core/functions.php';
//Use Models
require '../../../../models/developer/settings/roles/Roles.php';


 // get payload from front end
 $body = file_get_contents("php://input");
 $data = json_decode($body, true);

 //CREATE /Post method
 if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $result = require 'create.php';
    sendResponse($result);
    exit;
 }
 //Read /GET
 if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $result = require 'read.php';
    sendResponse($result);
    exit;
 }
 //Read /GET
 if($_SERVER['REQUEST_METHOD'] == 'PUT'){
    $result = require 'update.php';
    sendResponse($result);
    exit;
 }
 //delete
 if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    $result = require 'delete.php';
    sendResponse($result);
    exit;
 }

?>