<?php

$con = mysqli_connect("127.0.0.1", "root", "root", "goods");
$goodid = $_REQUEST["goodid"];
$sql = "DELETE FROM mycart  WHERE goodid='$goodid'";
mysqli_query($con, $sql);
?>