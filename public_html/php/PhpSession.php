<?php

session_start();

if(isset($_SESSION['user'])){
    if (isset($_REQUEST['session'])) {
        unset($_SESSION['user']);
        echo 'index.html';
    } else {
        echo 'DONE';
    }
}else{
    echo 'index.html';
}