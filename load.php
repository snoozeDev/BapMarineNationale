<?php

if(isset($_GET['id']) && ($_GET['id'] !=null)){

function phpAlert($msg) {
    echo '<script type="text/javascript">alert("' . $msg . '")</script>';
}   
include 'db.php';   
 
     

    
    
    
    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
    
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$sql = "SELECT id, mapName, mapDescription, cercles, polygs, texts, polyls, batis, bateaux FROM save_marine_table";
$result = $conn->query($sql);

    
    
    while($row = $result->fetch_assoc()) {
    
      if($row["id"] == $_GET["id"]){  
        
       
        
    if(strlen($row["cercles"]) !== 0){
        echo "
        <script> var cerclesPhp = ".$row["cercles"].";loadCercle(cerclesPhp);</script>
        ";
    }
      if(strlen($row["polygs"]) !== 0){
        echo "
        <script> var polygsPhp = ".$row["polygs"].";loadPolyg(polygsPhp);</script>
        ";
    }
      if(strlen($row["texts"]) !== 0){
        echo "
        <script> var textsPhp = ".$row["texts"].";loadText(textsPhp);</script>
        ";
    }
     if(strlen($row["polyls"]) !== 0){
        echo "
        <script> var polylsPhp = ".$row["polyls"].";loadPolyl(polylsPhp);</script>
        ";
    }
    if(strlen($row["batis"]) !== 0){
        echo "
        <script> var batisPhp = ".$row["batis"].";loadBati(batisPhp);</script>
        ";
    }
    if(strlen($row["bateaux"]) !== 0){
        echo "
        <script> var bateauxPhp = ".$row["bateaux"].";loadBateaux(bateauxPhp);</script>
        ";
    }
     
    }
    }
}

?>