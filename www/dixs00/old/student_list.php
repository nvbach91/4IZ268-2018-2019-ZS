<a href="index.php">Homepage</a>
<br>
<br>
<a href="student_detail.php">Add new student</a>
<br>
<br>

<?php
/*list students*/
$link = mysqli_connect("127.0.0.1", "root", "J30fOC73hkcz4by", "test");

mysqli_query($link,'SET NAMES "utf8"');

//var_dump($link);
$query = "SELECT * FROM STUDENT";
$result = mysqli_query($link,$query);
//var_dump($result->fetch_object());
if ($result){
	while ( $row = $result->fetch_object() ) {
	echo(
	
	'<a href="student_detail.php?id='.
	$row->STUDENT_ID
	.'">'
	.
	$row->name
	." ".
	$row->surname
	.
	"<br><br>"
	."</a>"
	);
	}
}