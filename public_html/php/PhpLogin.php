<?php

$username=$_REQUEST['username'];
$password=$_REQUEST['password'];

if($username=="ravinduC"){
    if($password=="ijse"){

        session_start();
        $_SESSION['user']="ravinduC";

        echo "borrow.html";
    }else{
        echo "password error";
    }
}else{
    echo "username error";
}
