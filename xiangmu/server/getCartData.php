<?php

$con = mysqli_connect("127.0.0.1", "root", "root", "goods");
$sql = "SELECT mycart.*,goodlist.name,goodlist.price,goodlist.src FROM mycart , goodlist WHERE mycart.goodid = goodlist.goodid";
$result = mysqli_query($con, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($data, true);

?>