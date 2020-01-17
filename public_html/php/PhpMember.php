<?php


$connection = mysqli_connect("localhost", "root", "ijse", "lms", "3306");
//$connection = mysqli_connect("localhost", "id8551666_rchathuranga417", "ijseweblms", "id8551666_lms", "3306");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $btn = $_REQUEST["btnMem"];
    switch ($btn) {
        case "Register":
        {
            $name = $_REQUEST["memName"];
            $contact = $_REQUEST["memContact"];
            $address = $_REQUEST["memAddress"];
            $nic = $_REQUEST["memNIC"];
            $reg_date = date("Y-m-d");
            $exp_date = date('Y-m-d', strtotime($reg_date . ' + 366 days'));

            $sql = "INSERT INTO member(mem_name,contact,address,nic,reg_date,exp_date) values ('$name','$contact','$address','$nic','$reg_date','$exp_date');";
            echo $connection->query($sql);
            break;
        }
        case "Modify":
        {
            $name = $_REQUEST["memName"];
            $contact = $_REQUEST["memContact"];
            $address = $_REQUEST["memAddress"];
            $nic = $_REQUEST["memNIC"];
            $id = $_REQUEST['memId'];
            echo $connection->query("UPDATE member SET mem_name='$name',contact='$contact',
        address='$address',nic='$nic' WHERE mem_id=$id");
            break;
        }
        case "Delete":
        {
            $id = $_REQUEST['memId'];
            echo $connection->query("DELETE FROM member WHERE mem_id='$id'");
            break;
        }
        case "Search":
        {
            $id = $_REQUEST['memId'];
            $all = $connection->query("SELECT *,DATEDIFF(exp_date,curdate()) FROM member WHERE mem_id='$id'")->fetch_all();
            echo json_encode($all);
            break;
        }
    }

} else {
    $all = $connection->query("SELECT *,DATEDIFF(exp_date,curdate()) FROM member")->fetch_all();
    echo json_encode($all);
}