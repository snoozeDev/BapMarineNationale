<?php

if(isset($_GET['id']) && ($_GET['id'] !=null)){

function phpAlert($msg) {
    echo '<script type="text/javascript">alert("' . $msg . '")</script>';
}   
include 'db.php';   
 
    $query="SELECT * FROM save_marine_nationale";
$results = mysql_query($query);

while ($row = mysql_fetch_array($results)) {
    echo '<tr>';
    foreach($row as $field) {
        echo '<td>' . htmlspecialchars($field) . '</td>';
    }
    echo '</tr>';
}
    
}

?>