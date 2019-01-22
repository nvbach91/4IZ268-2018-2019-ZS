<?php
    include 'database/db.php';
?>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
<div class="tableview">

<?php
$sql = "SELECT * FROM VSE_event_calculator_contacts ORDER BY timestamp DESC";
//$result = mysql_query($query);
$result = mysqli_query($conn,$sql);

echo "<table>";
echo "<tr><th><strong>Jméno akce</strong></th>
      <th><strong>Adresa akce</strong></th>
      <th><strong>Telefon na organizátora</strong></th>
      <th><strong>E-mail na organizátora</strong></th>
      <th><strong>Začátek akce</strong></th>
      <th><strong>Konec akce</strong></th>
      <th><strong>Velikost akce</strong></th>
      <th><strong>Stream</strong></th>
      <th><strong>Projekce</strong></th>
      <th><strong>Záznam</strong></th>
      <th><strong>Klip</strong></th>
      <th><strong>Obnova formuláře</strong></th>
      </tr>";

while($row = mysqli_fetch_array($result)){
echo "<tr><td>" . $row['event_name'] . "</td>
          <td>" . $row['event_address'] . "</td>
          <td>" . $row['organizer_contact'] . "</td>
          <td>" . $row['organizer_email'] . "</td>
          <td>" . $row['event_start'] . "</td>
          <td>" . $row['event_end'] . "</td>
          <td>" . $row['event_size'] . "</td>
          <td>" . $row['stream'] . "</td>
          <td>" . $row['projekce'] . "</td>
          <td>" . $row['zaznam'] . "</td>
          <td>" . $row['klip'] . "</td>
          <td><a href=./kalkulacka.html?event_name=" . rawurlencode($row['event_name']) .
                                      "&event_address=" . rawurlencode($row['event_address']) . 
                                      "&event_contact=" . rawurlencode($row['organizer_contact']) . 
                                      "&event_email=" . rawurlencode($row['organizer_email']) . 
                                      "&event_start=" . rawurlencode($row['event_start']) . 
                                      "&event_end=" . rawurlencode($row['event_end']) . 
                                      "&event_size=" . rawurlencode($row['event_size']) . 
                                      "&event_stream=" . rawurlencode($row['stream']) . 
                                      "&event_projection=" . rawurlencode($row['projekce']) . 
                                      "&event_recording=" . rawurlencode($row['zaznam']) . 
                                      "&event_clip=" . rawurlencode($row['klip']) . 
                                      "&id=" . rawurlencode($row['sess_id']) . 
                                      ">Go to form</a>
          </td>
      </tr>";
}

echo "</table>";
mysqli_close($conn);
?>
</div>
</body>
</html>