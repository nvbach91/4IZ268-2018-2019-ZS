<a href="student_list.php">List of students</a>
<br>
<a href="index.php">Homepage</a>
<br>
<br>

<?php


// define variables and set to empty values
$fname = $lname = "";


function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

$link = mysqli_connect("127.0.0.1", "root", "J30fOC73hkcz4by", "test");
mysqli_query($link,'SET NAMES "utf8"');

if ($_POST["submit"]){
$fname = test_input($_POST["fname"]);
  $lname = test_input($_POST["lname"]);

	mysqli_query($link,"INSERT INTO STUDENT(name,surname) VALUES('$fname','$lname')");
	mysqli_commit($link);
}

if ($_POST["delete"]){

	mysqli_query($link,"DELETE FROM STUDENT WHERE STUDENT_ID=".$_GET["id"]);
	mysqli_commit($link);
}
//if get id use update else use insert TO BE DONE 	
if ($id = $_GET["id"]){
$result = mysqli_query($link,"SELECT * FROM STUDENT WHERE STUDENT_ID=$id");
$student = $result->fetch_object();
}

mysqli_close($link);
?>

<form method="POST">

  First name: <input type="text" name="fname" value="<?php echo $student->name;?>"><br>
  Last name: <input type="text" name="lname" value="<?php echo $student->surname;?>"><br>
  <input type="submit" value="Submit" name="submit">
  
</form>
<form method="POST">

  <input type="submit" value="Delete" name="delete">

</form>
