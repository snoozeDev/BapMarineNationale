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
    echo "
    
    
    
    <script>
    var cerclesPhp = $cercles;
    var polygsPhp = $polygs;
    var textsPhp = $texts;
    loadCercle(cerclesPhp);
    loadPolyg(polygsPhp);
    loadText(textsPhp);

    
    
    
    
    </script>
    
    
    
    
    
    
    
    
    
    
    ";
                    endwhile;
                 
    
}

?>