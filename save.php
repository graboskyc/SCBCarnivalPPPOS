<?php

function connectDB()
{
        $DB = array(
            "host" => "",
            "username" => "",
            "password" => "",
            "db" => ";"
        );

	$conn = new PDO("mysql:host=".$DB['host'].";dbname=".$DB['db'], $DB['username'], $DB['password']);
	$conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	return $conn;
}

function closeDB()
{
        @mysql_close();
}

$conn = connectDB();
$sql = "INSERT INTO recpt (recid, register, encText) VALUES (?,?,?)";
$stmt = $conn->prepare($sql);
$stmt->bindValue(1, $_POST['recid']);
$stmt->bindValue(2, $_POST['register']);
$stmt->bindValue(3, $_POST['encText']);
$stmt->execute();

closeDB();
?>