<?php

// check database connection
$conn = null;
$conn = checkDbConnection($conn);
//make use of classes for save database
$val = new Roles($conn);

if(array_key_exists("id",$_GET)){
    $val->role_aid = $_GET['id'];
    
    //Validation
    checkId($val->role_aid);

    $query = checkDelete($val);
    http_response_code(200);
    returnSuccess($val,"Roles Deleted", $query);
}
checkEndpoint();
