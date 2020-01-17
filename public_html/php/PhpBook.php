<?php


$connection = mysqli_connect("localhost", "root", "ijse", "lms", "3306");
//$connection = mysqli_connect("localhost", "id8551666_rchathuranga417", "ijseweblms", "id8551666_lms", "3306");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $btn = $_REQUEST["btnBook"];
    switch ($btn) {
        case "Register":
        {
            $title = $_REQUEST["bookTitle"];
            $copies = $_REQUEST["copies"];
            $author = $_REQUEST["author"];
            $pub = $_REQUEST["publisher"];

            $sql = "INSERT INTO book(title, no_of_copies, author, publisher) VALUES ('$title','$copies','$author','$pub')";
            echo $connection->query($sql);
            break;
        }
        case "Modify":
        {
            $id = $_REQUEST['bookId'];
            $title = $_REQUEST["bookTitle"];
            $copies = $_REQUEST["copies"];
            $author = $_REQUEST["author"];
            $pub = $_REQUEST["publisher"];
            $sql="UPDATE book SET title='$title',no_of_copies='$copies',author='$author',publisher='$pub' WHERE  book_id='$id'";
            echo $connection->query($sql);
            break;
        }
        case "Delete":
        {
            $id = $_REQUEST['bookId'];
            echo $connection->query("DELETE FROM book WHERE book_id='$id'");
            break;
        }
        case "Search":
        {
            $id = $_REQUEST['bookId'];
            $all = $connection->query("select b.book_id,
                      b.title,b.no_of_copies,b.availability,b.author,
                       a.name,p.pub_id,p.publisher from
                      book b,author a,publisher p where author_id=author
                       && b.publisher=pub_id && b.book_id='$id'")->fetch_assoc();

            echo json_encode($all);
            break;
        }
    }

} else {
    $all = $connection->query("select b.book_id,
                 b.title,b.no_of_copies,b.availability,b.author,
                  a.name,b.publisher,p.publisher from
                 book b,author a,publisher p where author_id=author
                  && b.publisher=pub_id order by b.book_id;")->fetch_all();

    echo json_encode($all);
}