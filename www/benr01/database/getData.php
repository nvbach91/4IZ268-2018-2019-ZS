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
$end = $_GET['end'];
$name = $_GET['name'];
$organizer = $_GET['organizer'];
$email = $_GET['email'];
$address = $_GET['address'];
$stream = ($_GET['stream'] == 'true');
$projection = ($_GET['projection'] == 'true');
$recording = ($_GET['recording'] == 'true');
$clip = ($_GET['clip'] == 'true');

$sql_query = "";
$service_count = 0;

store_session($conn, $id, $name, $address, $organizer, $email, $start, $end, $size, $stream, $projection, $recording, $clip);

if($stream){
    $service_count++;
    $sql_query .= "stream";
}
if($projection){
    $service_count++;
    if($sql_query != ""){
        $sql_query .= ", ";
    }
    $sql_query .= "projekce";
}
if($recording){
    $service_count++;
    if($sql_query != ""){
        $sql_query .= ", ";
    }
    $sql_query .= "zaznam";
}
if($clip){
    $service_count++;
    if($sql_query != ""){
        $sql_query .= ", ";
    }
    $sql_query .= "klip";
}

if($service_count <= 1){
    get_single_service_price($conn, $sql_query, $size, $duration);
} else {
    get_multi_service_price($conn, $size, $duration, $stream, $projection, $recording, $clip);
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

function get_single_service_price($conn, $sql_query, $size, $duration){
    $sql_query_base_price .= "SELECT ".$sql_query." FROM VSE_event_base_prices WHERE id = '".$size."'";
    $sql_query_single_price .= "SELECT ".$sql_query." FROM VSE_event_single_prices WHERE id = '".$size."'";

    $result = mysqli_query($conn, $sql_query_base_price);
    
    $price_base = 0;
    $price_add = 0;
    
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_array($result);
        $price_base = $row[0];
    } 
    
    $result = mysqli_query($conn, $sql_query_single_price);
    
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

function get_multi_service_price($conn, $size, $duration, $stream, $projection, $recording, $clip){
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
    if($projection){
        $toEcho += (get_multiplicator_from_duration($duration) * $price_projekce_add);
    }
    if($recording){
        $toEcho += (get_multiplicator_from_duration($duration) * $price_zaznam_add);
    }
    if($clip) {
        $toEcho += $price_base_klip + (get_multiplicator_from_duration($duration) * $price_klip_add);
    }
    
    echo $toEcho . " Kč";
}

function store_session($conn, $id, $name, $address, $organizer, $email, $start, $end, $size, $stream, $projection, $recording, $clip){
    $sql .= "INSERT INTO VSE_event_calculator_contacts (sess_id, event_name, event_address, organizer_contact, organizer_email, event_start, event_end, event_size, stream, projekce, zaznam, klip) VALUES ('".$id."', '".$name."', '".$address."', '".$organizer."', '".$email."', '".$start."', '".$end."', '".$size."', '".$stream."', '".$projection."', '".$recording."', '".$clip."') ON DUPLICATE KEY UPDATE event_name='".$name."',event_address='".$address."',organizer_contact='".$organizer."',organizer_email='".$email."', event_start='".$start."', event_end='".$end."', event_size='".$size."', stream='".$stream."', projekce='".$projection."', zaznam='".$recording."', klip='".$clip."'";
    if ($conn->query($sql) === TRUE) {

    }/* else {

    }*/
}


?>
</body>
</html>