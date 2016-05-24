
<?php 
        include 'db.php';
      $con=mysqli_connect($dbhost,$dbuser,$dbpass,$db);      

$name = $_POST['mapName'];
$description = $_POST['mapDescription'];
$cercles = $_POST['cercles'];
$polygs = $_POST['polygs'];
$texts = $_POST['texts'];


$sql = "INSERT INTO save_marine_table (mapName, mapDescription, cercles, polygs, texts) VALUES ('$name','$description','$cercles','$polygs', '$texts')";

 if(mysqli_query($con, $sql)){
 
 }

?>     