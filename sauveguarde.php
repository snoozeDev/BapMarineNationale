<<<<<<< HEAD
<?php 
        include 'db.php';
      $con=mysqli_connect($dbhost,$dbuser,$dbpass,'save_marine_nationale_db');      

$name = $_POST['name'];
$description = $_POST['description'];
$author = $_POST['author'];



$sql = "INSERT INTO save_marine_nationale_table (name, description, author) VALUES ('$name','$description','$author')";

 if(mysqli_query($con, $sql)){
 
 }
=======
<?php 
        include 'db.php';
      $con=mysqli_connect($dbhost,$dbuser,$dbpass,'save_marine_nationale_db');      

$name = $_POST['name'];
$description = $_POST['description'];
$author = $_POST['author'];



$sql = "INSERT INTO save_marine_nationale_table (name, description, author) VALUES ('$name','$description','$author')";

 if(mysqli_query($con, $sql)){
 
 }
>>>>>>> 1abfc6fb8ff3ceb7c3f4bbb0314162f1b22ee8ed
?>     