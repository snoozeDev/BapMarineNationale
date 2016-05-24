
<?php 
        include 'db.php';
      $con=mysqli_connect($dbhost,$dbuser,$dbpass,$db);      

$name = $_POST['mapName'];
$description = $_POST['mapDescription'];
$cercles = $_POST['cercles'];
$polygs = $_POST['polygs'];



$sql = "INSERT INTO save_marine_table (mapName, mapDescription, cercles) VALUES ('$name','$description','$cercles')";

 if(mysqli_query($con, $sql)){
 
 }

?>     