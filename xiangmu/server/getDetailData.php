<?php

$con = mysqli_connect("127.0.0.1", "root", "root", "goods");
$sql = "SELECT detail.*,goodlist.name,goodlist.price,goodlist.src,goodlist.isSelf FROM detail , goodlist WHERE detail.goodid = goodlist.goodid";
$result = mysqli_query($con, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($data, true);

?>