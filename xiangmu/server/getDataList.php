<?php

// mysqli_query($conn , "set names utf8");
# 先连接数据库
$con = mysqli_connect("127.0.0.1", "root", "root", "goods");

$page = $_REQUEST["page"] * 56;
$orderType = $_REQUEST["orderType"];
// $inorde = $_REQUEST["inorde"];

if($orderType == 0)
{
  # 获取所有的商品信息
  $sql = "SELECT * FROM `goodList` order by `goodid` limit $page , 56";
}else if($orderType == 1)
{
  $sql = "SELECT * FROM `goodList` ORDER BY `isSelf` DESC limit $page , 56";
}else if($orderType == 2)
{
  $sql = "SELECT * FROM `goodList` ORDER BY `goodid` ASC limit $page , 56";
}else if($orderType == 3)
{
  $sql = "SELECT * FROM `goodList` ORDER BY `comment` ASC limit $page , 56";
}
else if($orderType == 4)
{
  $sql = "SELECT * FROM `goodList` ORDER BY `src` ASC limit $page , 56";
}else if($orderType == 5)
{
  $sql = "SELECT * FROM `goodList` ORDER BY `price` ASC limit $page , 56";
}

# 获取所有的商品信息


$result = mysqli_query($con,$sql);

$data = array("status" => "success", "msg" => "请求成功", "data" => mysqli_fetch_all($result, MYSQLI_ASSOC));
echo json_encode($data, true);

?>
