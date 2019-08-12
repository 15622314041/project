<?php
$con = mysqli_connect("127.0.0.1", "root", "root", "goods");

/* 获取id和active */
$goodid = $_REQUEST["goodid"];
$num = $_REQUEST["num"];
$total = $_REQUEST["total"];

/* 编写sql语句 */
$sql = "UPDATE mycart SET num=$num,total=$total WHERE goodid='$goodid'";
mysqli_query($con,$sql);
?>