<?php

if(isset($_GET['id']) && ($_GET['id'] !=null)){

function phpAlert($msg) {
    echo '<script type="text/javascript">alert("' . $msg . '")</script>';
}   
include 'db.php';   
 
     
    $connect = mysql_connect($dbhost,$dbuser,$dbpass);
                mysql_select_db($db);
                mysql_query("SET NAMES UTF8"); 
                $query = mysql_query("SELECT * FROM save_marine_table WHERE ID = $_GET[id]");
                while($rows = mysql_fetch_array($query)):
                $id = $rows['id'];
                $mapName = $rows['mapName'];
                $cercles = $rows['cercles']; 
    $polygs = $rows['polygs']; 
      $texts = $rows['texts'];
    $polyls = $rows['polyls'];
    $batis = $rows['batis'];
    
    
    if(strlen($cercles) !== 0){
        echo "
        <script> var cerclesPhp = $cercles;loadCercle(cerclesPhp);</script>
        ";
    }
      if(strlen($polygs) !== 0){
        echo "
        <script> var polygsPhp = $polygs;loadPolyg(polygsPhp);</script>
        ";
    }
      if(strlen($texts) !== 0){
        echo "
        <script> var textsPhp = $texts;loadText(textsPhp);</script>
        ";
    }
     if(strlen($polyls) !== 0){
        echo "
        <script> var polylsPhp = $polyls;loadPolyl(polylsPhp);</script>
        ";
    }
    if(strlen($batis) !== 0){
        echo "
        <script> var batisPhp = $batis;loadBati(batisPhp);</script>
        ";
    }
           endwhile;
                 
    
}

?>