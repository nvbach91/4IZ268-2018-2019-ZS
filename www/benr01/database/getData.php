<?php
    include 'db.php';
?>

<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
$id = $_GET['id'];
$size = intval($_GET['size']);
$duration = intval($_GET['duration']);
$start = $_GET['start'];
$name = $_GET['name'];
$organizer = $_GET['organizer'];
$stream = ($_GET['stream'] == 'true');
$projekce = ($_GET['projekce'] == 'true');
$zaznam = ($_GET['zaznam'] == 'true');
$klip = ($_GET['klip'] == 'true');

$sql2 = "";
$service_count = 0;

store_session($conn, $id, $name, $organizer, $start, $size, $stream, $projekce, $zaznam, $klip);

if($stream){
    $service_count++;
    $sql2 .= "stream";
}
if($projekce){
    $service_count++;
    if($sql2 != ""){
        $sql2 .= ", ";
    }
    $sql2 .= "projekce";
}
if($zaznam){
    $service_count++;
    if($sql2 != ""){
        $sql2 .= ", ";
    }
    $sql2 .= "zaznam";
}
if($klip){
    $service_count++;
    if($sql2 != ""){
        $sql2 .= ", ";
    }
    $sql2 .= "klip";
}

if($service_count <= 1){
    get_single_service_price($conn, $sql2, $size, $duration);
} else {
    get_multi_service_price($conn, $size, $duration, $stream, $projekce, $zaznam, $klip);
}

mysqli_close($conn);

function get_multiplicator_from_duration($duration) {
    $duration = $duration - 2;
    if($duration <= 0){
        return 0;
    } else {
        return $duration/2;
    }
}

function get_single_service_price($conn, $sql2, $size, $duration){
    $sql .= "SELECT ".$sql2." FROM VSE_event_base_prices WHERE id = '".$size."'";
    $sqlB .= "SELECT ".$sql2." FROM VSE_event_single_prices WHERE id = '".$size."'";

    $result = mysqli_query($conn, $sql);
    
    $price_base = 0;
    $price_add = 0;
    
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_array($result);
        $price_base = $row[0];
    } 
    
    $result = mysqli_query($conn, $sqlB);
    
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_array($result);
        $price_add = $row[0];
    }
    
    if($duration == 0){
        echo '0 Kč';
    } else {
        $toEcho = $price_base + (get_multiplicator_from_duration($duration) * $price_add);
        echo $toEcho . " Kč";
    }
}

function get_multi_service_price($conn, $size, $duration, $stream, $projekce, $zaznam, $klip){
    $sql .= "SELECT * FROM VSE_event_combo_prices WHERE id = '".$size."'";

    $price_base_live = 0;
    $price_base_klip = 0;
    $price_stream_add = 0;
    $price_projekce_add = 0;
    $price_zaznam_add = 0;
    $price_klip_add = 0;

    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_array($result);
        $price_base_live = $row[1];
        $price_base_klip = $row[2];
        $price_stream_add = $row[3];
        $price_projekce_add = $row[4];
        $price_zaznam_add = $row[5];
        $price_klip_add = $row[6]; 
    }


    if($duration == 0){
        echo '0 Kč';
        return;
    }

    $toEcho = $price_base_live;

    if($stream){
        $toEcho += (get_multiplicator_from_duration($duration) * $price_stream_add);
    }
    if($projekce){
        $toEcho += (get_multiplicator_from_duration($duration) * $price_projekce_add);
    }
    if($zaznam){
        $toEcho += (get_multiplicator_from_duration($duration) * $price_zaznam_add);
    }
    if($klip) {
        $toEcho += $price_base_klip + (get_multiplicator_from_duration($duration) * $price_klip_add);
    }
    
    echo $toEcho . " Kč";
}

function store_session($conn, $id, $name, $organizer, $start, $size, $stream, $projekce, $zaznam, $klip){
    $sql .= "INSERT INTO VSE_event_calculator_contacts (sess_id, event_name, organizer_contact, stream, projekce, zaznam, klip) VALUES ('".$id."', '".$name."', '".$organizer."', '".$stream."', '".$projekce."', '".$zaznam."', '".$klip."') ON DUPLICATE KEY UPDATE event_name='".$name."'";
    if ($conn->query($sql) === TRUE) {

    } else {

    }
}


?>
</body>
</html>