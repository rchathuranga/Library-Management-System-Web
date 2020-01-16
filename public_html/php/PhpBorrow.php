<?php
$connection = mysqli_connect("localhost", "root", "ijse", "lms", "3306");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $btn = $_REQUEST["btnBorrow"];
    switch ($btn) {
        case "Register":
        {
            $memId=$_REQUEST["memId"];
            $bookId=$_REQUEST["bookId"];
            $returnDate=$_REQUEST["returnDate"];

            $sql = "INSERT INTO borrow(member, book, borrow_date, return_date) VALUES ('$memId','$bookId',curdate(),'2020-01-16')";
            echo $sql;
            echo $connection->query($sql);
            break;
        }
        case "Modify":
        {

            break;
        }
        case "Delete":
        {

            break;
        }
        case "Search":
        {

            break;
        }
    }

} else {

}