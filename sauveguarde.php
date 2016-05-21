
<?php 
        include 'db.php';
      $con=mysqli_connect($dbhost,$dbuser,$dbpass,$db);      

$name = $_POST['mapName'];
$description = $_POST['mapDescription'];



$sql = "INSERT INTO save_marine_table (mapName, mapDescription) VALUES ('$name','$description')";

 if(mysqli_query($con, $sql)){
 
 }

?>     