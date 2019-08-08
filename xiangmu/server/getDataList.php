<?php


# 先连接数据库
$con = mysqli_connect("127.0.0.1", "root", "root", "goods");

$page = $_REQUEST["page"] * 56;

# 获取所有的商品信息
$sql = "SELECT * FROM `goodList` limit $page , 56";

$result = mysqli_query($con,$sql);

$data = array("status" => "success", "msg" => "请求成功", "data" => mysqli_fetch_all($result, MYSQLI_ASSOC));
echo json_encode($data, true);

?>
