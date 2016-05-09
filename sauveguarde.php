<?php 
        include 'db.php';
      $con=mysqli_connect($dbhost,$dbuser,$dbpass,'save_marine_nationale_db');      

$name = $_POST['name'];
$description = $_POST['description'];
$author = $_POST['author'];



$sql = "INSERT INTO save_marine_nationale_table (name, description, author) VALUES ('$name','$description','$author')";

 if(mysqli_query($con, $sql)){
 
 }
?>     