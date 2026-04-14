<?php

// check database connection
$conn = null;
$conn = checkDbConnection($conn);
//make use of classes for save database

$name = data['name'];
$role_name = $data['role-name'];

returnError($role_name);