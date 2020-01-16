<?php

$connection = mysqli_connect("localhost", "root", "ijse", "lms", "3306");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_REQUEST["btnAuthor"])) {
        $btn = $_REQUEST["btnAuthor"];
        switch ($btn) {
            case "Register":
            {
                $name = $_REQUEST["authorName"];
                $nat = $_REQUEST["authorNationality"];
                echo $connection->query("INSERT INTO author(name, Nationality) VALUES('$name','$nat')");
                break;
            }
            case "Search":{
                $id=$_REQUEST["authorId"];
                $all=$connection->query("SELECT * FROM author where author_id='$id'")->fetch_assoc();
                echo json_encode($all);
            }
        }
    } elseif (isset($_REQUEST["btnPublisher"])) {
        $btn = $_REQUEST["btnPublisher"];
        switch ($btn) {
            case "Register":
            {
                $name = $_REQUEST["pubName"];
                $address = $_REQUEST["pubAddress"];
                $sql = "INSERT INTO publisher(publisher, address) values ('$name','$address');";
                $connection->query($sql);
            }
        }
    }
} else {
    if (isset($_REQUEST["btnAuthor"])) {
        $all=$connection->query("Select * from author")->fetch_all();
        echo json_encode($all);
    }else{
        $all=$connection->query("Select * from publisher")->fetch_all();
        echo json_encode($all);
    }
}
