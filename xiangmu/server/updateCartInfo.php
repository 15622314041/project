<?php
$con = mysqli_connect("127.0.0.1", "root", "root", "goods");

/* 获取id和active */
$goodid = $_REQUEST["goodid"];
$isActive = $_REQUEST["isActive"];
/* 编写sql语句 */
$sql = "UPDATE mycart SET isActive=$isActive WHERE goodid='$goodid'";
mysqli_query($con,$sql);
?>