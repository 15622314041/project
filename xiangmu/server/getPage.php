<?php

$db = mysqli_connect("127.0.0.1", "root", "root", "goods");

# 查询获取表中的所有内容
$sql = "SELECT * FROM goodList";

$result = mysqli_query($db,$sql);

if(!$result)
{
  $data = array("status" => "error", "msg" => "请求失败");
  echo json_encode($data, true);
}else
{
  $size = 70;
  $count = ceil(mysqli_num_rows($result) / $size);
  $data = array("status" => "success", "msg" => "请求成功","data"=>array("count"=>$count));
  echo json_encode($data, true);
}

?>