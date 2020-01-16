<?php

session_start();

if(isset($_SESSION['user'])){
    echo 'DONE';
}else{
    echo 'index.html';
}