<?php
$con = mysqli_connect("127.0.0.1", "root", "root", "goods");
$goodid = $_REQUEST["goodid"];
// $price = $_REQUEST["price"];

/* 分两种情况 */
/* 001-第一次添加该商品  插入数据 */
$sql = "SELECT * FROM  detail WHERE goodid = '$goodid'";
$result = mysqli_query($con,$sql);
$row = mysqli_num_rows($result);



$insetSql = "INSERT INTO `detail` ( `goodid`) 
VALUES ($goodid)";
mysqli_query($con,$insetSql);


// elseif($row == 1){
//    /* 002-购物车中已经存在该商品  更新数据 */
//    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
//    $num = $data[0]["num"] + 1;
//    $total = $data[0]["price"] * $num;

//    /* 更新 */
//    $updateSql = "UPDATE mycart SET num='$num',total='$total' WHERE goodid=' $goodid'";
//    mysqli_query($con, $updateSql);
// }


// $totalCount = "SELECT * FROM  mycart";
// $result = mysqli_query($con, $totalCount);
// $row = mysqli_num_rows($result);
// echo '{"totalRow":'.$row.'}';


?>