
 <h1>DELETE</h1>

 <?php

 include 'db.php';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $db);

if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

$id = $_GET['id'];
$sql = 'DELETE FROM save_marine_table WHERE id='.$id;

if (mysqli_query($conn, $sql)) {
    echo 'Record deleted successfully';
} else {
    echo 'Error deleting record: ' . mysqli_error($conn);
}



mysqli_close($conn);

header('Location: index.php')

?>