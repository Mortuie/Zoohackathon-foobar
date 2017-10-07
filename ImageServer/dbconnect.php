<?php
    $host = "localhost";
    $user = "root";
    $pass = "C9GLdKqQQKXi.k";
    $db = "foobar";
    
    $connection = mysqli_connect($host, $user, $pass, $db);
    if (mysqli_connect_errno()) {
        die("Database connection failed! " .
            mysqli_connect_error() . " (" . 
            mysqli_connect_errno() . ")");
    } else {
        //echo "success";
    }
?>