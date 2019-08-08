<?php 
    header("content-type:text/html;charset=utf-8");
    mysql_query('SET NAMES UTF8'); 
    //连接数据库
    $db = mysqli_connect("127.0.0.1","root","root","goods");

    $page = $_REQUEST["page"] * 20;

    $sql = "SELECT * FROM `goodsList` order by `name` limit $page , 20";
    



    $result = mysqli_query($db,$sql);
    
    $data = array("status" => "success", "msg" => "请求成功", "data" => mysqli_fetch_all($result, MYSQLI_ASSOC));
    echo json_encode($data, true);

 ?>