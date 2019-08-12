<?php
# 先获取提交的参数
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

# 连接数据库并且到数据库中进行查询
$db = mysqli_connect("127.0.0.1", "root", "root", "login");
 
# 用户名存在 && 密码要正确
# 检查指定的用户名
$sql = "SELECT * FROM  userdata WHERE username = '$username'";
$result = mysqli_query($db,$sql);
$data = array("status" => "", "msg" => "", "data" => "");

if(mysqli_num_rows($result) == "0")
{
  $data["status"] = "error";
  $data["msg"] = "登录失败：该用户不存在";
}if(mysqli_num_rows($result) == "1"){
    
    $data["status"] = "success";
    $data["msg"] = "恭喜你，登录成功！";
  
}


echo json_encode($data, true)
// print_r(mysqli_fetch_array($result));
?>