
<?php 
        include 'db.php';
      $con=mysqli_connect($dbhost,$dbuser,$dbpass,$db);      

$name = $_POST['mapName'];
$description = $_POST['mapDescription'];
$cercles = $_POST['cercles'];
$polygs = $_POST['polygs'];
$texts = $_POST['texts'];
$polyls = $_POST['polyls'];
$batis = $_POST['batis'];
$bateaux = $_POST['bateaux'];
$sql = "INSERT INTO save_marine_table (mapName, mapDescription, cercles, polygs, texts, polyls, batis, bateaux) VALUES ('$name','$description','$cercles','$polygs', '$texts', '$polyls', '$batis', 'zob')";

echo "<script>console.log($bateaux + 'boats')</script>";

 if(mysqli_query($con, $sql)){
 
 }

?>     