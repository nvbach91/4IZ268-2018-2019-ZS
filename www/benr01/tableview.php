<?php
    include 'database/db.php';
?>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>

<?php
$sql = "SELECT * FROM VSE_event_calculator_contacts ORDER BY timestamp DESC";
//$result = mysql_query($query);
$result = mysqli_query($conn,$sql);

echo "<table>";
echo "<tr><th><b>Jméno akce</b></th><th><b>Adresa akce</b></th><th><b>Kontakt na organizátora</b></th><th><b>Začátek akce</b></th><th><b>Konec akce</b></th><th><b>Velikost akce</b></th><th><b>Stream</b></th><th><b>Projekce</b></th><th><b>Záznam</b></th><th><b>Klip</b></th></tr>";
while($row = mysqli_fetch_array($result)){
echo "<tr><td>" . $row['event_name'] . "</td><td>" . $row['event_address'] . "</td><td>" . $row['organizer_contact'] . "</td><td>" . $row['event_start'] . "</td><td>" . $row['event_end'] . "</td><td>" . $row['event_size'] . "</td><td>" . $row['stream'] . "</td><td>" . $row['projekce'] . "</td><td>" . $row['zaznam'] . "</td><td>" . $row['klip'] . "</td></tr>";
}

echo "</table>";
mysqli_close($conn);
?>
</body>
</html>