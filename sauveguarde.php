
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
$bateaux = $_POST['bateau_save'];
$idUpdate = $_POST['idUpdate'];


if (isset($_POST['update'])) {
    
    $sql = "UPDATE save_marine_table SET cercles='$cercles', polygs='$polygs', texts='$texts', polyls='$polyls', batis='$batis', bateaux='$bateaux' WHERE id=$idUpdate";
    
    
} else if (isset($_POST['save'])) {
    $sql = "INSERT INTO save_marine_table (mapName, mapDescription, cercles, polygs, texts, polyls, batis, bateaux) VALUES ('$name','$description','$cercles','$polygs', '$texts', '$polyls', '$batis', '$bateaux')";
}


 if(mysqli_query($con, $sql)){
 
 }


if (isset($_POST['update'])) {
    $last_id = $idUpdate;
} else if (isset($_POST['save'])) {
 $last_id = mysqli_insert_id($con);
}
   header('Location: map.php?id='.$last_id)



?>     