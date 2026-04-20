<?php
// set http header
require '../../../../core/header.php';
// include core functions
require '../../../../core/functions.php';
//Use Models
require '../../../../models/developer/settings/users/Users.php';


 // get payload from front end
 $body = file_get_contents("php://input");
 $data = json_decode($body, true);


 if(isset($_SERVER['HTTP_AUTHORIZATION'])){
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
    exit;+
 }
 //Update /Put
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


 }
 //return access error
checkAccess();
?>